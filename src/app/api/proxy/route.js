import { getData } from "@/utils/getData";
import { NextResponse } from "next/server";

const rateLimitMap = new Map(); // Para rastrear solicitudes por userId
const TIME_WINDOW = 60 * 1000; // 60 segundos
const MAX_REQUESTS = 5; // Máximo de solicitudes permitidas por ventana de tiempo

export async function POST(req) {
  try {
    // Obtener el cuerpo de la solicitud
    const { value, userId } = await req.json();

    if (!userId || !value) {
      return NextResponse.json(
        { error: "El userId y el valor son requeridos.", ok: false },
        { status: 400 }
      );
    }

    //! falta verificar si el rate limiting por userId

    // Manejar el rate limiting por userId
    const now = Date.now();
    if (!rateLimitMap.has(userId)) {
      rateLimitMap.set(userId, { count: 1, startTime: now });
    } else {


      const userData = rateLimitMap.get(userId);
      if (now - userData.startTime < TIME_WINDOW) {
        if (userData.count >= MAX_REQUESTS) {
          return NextResponse.json(
            {
              error: "Demasiadas solicitudes, inténtalo más tarde.",
              ok: false,
            },
            { status: 429 }
          );
        }
        userData.count += 1;
      } else {
        rateLimitMap.set(userId, { count: 1, startTime: now });
      }
    }

    const url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/search/article/${value}`;
    const { status, res } = await getData(url, 0);

    if (!status || !res?.data?.articles?.length) {
      // Si no hay resultados, retorna una respuesta vacía
      return NextResponse.json({ data: [], ok: true }, { status: 200 });
    }

    // Retorna una respuesta
    return NextResponse.json(
      { data: res.data.articles, ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", ok: false },
      { status: 500 }
    );
  }
}
