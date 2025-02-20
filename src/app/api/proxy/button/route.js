import { NextResponse } from "next/server";
import { getData } from "@/utils/getData";

export async function POST(req) {
  try {
    const { params, result } = await req.json();

    await getData(
      `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/category/${
        params.categoria
      }/article/${params.subcategoria}/like/${result ? 1 : 0}`,
      0
    );

    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error) {
    console.log({ errorRoute: error });
    return NextResponse.json({ error: error, ok: false }, { status: 500 });
  }
}
