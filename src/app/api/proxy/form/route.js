import { sendData } from "@/utils/getData";
import { NextResponse } from "next/server";

export async function POST(req) {
  // const { value, userId } = await req.json();
  try {
    const { email }  = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "El email es requerido.", ok: false, data: [] },
        { status: 400 }
      );
    }


    // Hacer la solicitud a la API externa
    const url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/search/contact`;
    const { status, res } = await sendData(url, email);
    console.log({ res });


    return NextResponse.json({ status, data: res.data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Intente nuevamente mas tarde", ok: false, data: [] },
      { status: 500 }
    );
  }
}
