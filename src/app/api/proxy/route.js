import { getData } from "@/utils/getData";
import { NextResponse } from "next/server";

const rateLimitMap = new Map(); // Para rastrear solicitudes por userId
const TIME_WINDOW = 60 * 1000; // 60 segundos
const MAX_REQUESTS = 20; // Máximo de solicitudes permitidas por ventana de tiempo

export async function POST(req) {
  try {
    // Obtener el cuerpo de la solicitud
    const { value, userId } = await req.json();

    if (!userId || !value) {
      return NextResponse.json(
        { error: "El userId y el valor son requeridos.", ok: false, data: [] },
        { status: 400 }
      );
    }

    // Manejar el rate limiting por userId
    const now = Date.now();
    let userData = rateLimitMap.get(userId);

    if (!userData) {
      // Primera solicitud: inicializar datos del usuario
      userData = { count: 1, startTime: now };
      rateLimitMap.set(userId, userData);
    } else {
      if (now - userData.startTime < TIME_WINDOW) {
        // Dentro de la ventana de tiempo
        if (userData.count >= MAX_REQUESTS) {
          const timeLeft = TIME_WINDOW - (now - userData.startTime);
          const timeDifference = Math.ceil(timeLeft / 1000); // Tiempo restante en segundos

          return NextResponse.json(
            {
              error: "Demasiadas solicitudes, inténtalo más tarde",
              ok: false,
              data: [],
              time: timeDifference,
            },
            { status: 429 }
          );
        }
        userData.count += 1;
      } else {
        // Fuera de la ventana de tiempo: reiniciar contador y tiempo
        userData = { count: 1, startTime: now };
        rateLimitMap.set(userId, userData);
      }
    }

    // Hacer la solicitud a la API externa
    const url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/search/article/${value}`;
    const { status, res } = await getData(url, 0);

    if (!status || !res?.data?.articles?.length) {
      // Si no hay resultados, retorna una respuesta vacía
      return NextResponse.json({ data: [], ok: true }, { status: 200 });
    }

    // Retorna los resultados obtenidos
    return NextResponse.json(
      { data: res.data.articles, ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Intente nuevamente mas tarde", ok: false, data: [] },
      { status: 500 }
    );
  }
}
