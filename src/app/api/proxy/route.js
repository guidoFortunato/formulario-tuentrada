import { getData } from "@/utils/getData";
import { NextResponse } from "next/server";

let cachedToken = null;
let tokenExpiration = 0;

export async function POST(req) {
  try {
    // Obtener el cuerpo de la solicitud
    const { value } = await req.json();

    if (!value) {
      return NextResponse.json(
        { error: "El valor es requerido.", ok: false },
        { status: 400 }
      );
    }

    const url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/search/article/${value}`;
    const { status, res } = await getData(url, 0);

    if (!status || !res?.data?.articles?.length) {
      // Si no hay resultados, retorna una respuesta vacía
      return NextResponse.json({ data: [], ok: true }, { status: 200 });
    }

    // Retorna una respuesta
    return NextResponse.json({ data: res.data.articles, ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor", ok: false },
      { status: 500 }
    );
  }
}
