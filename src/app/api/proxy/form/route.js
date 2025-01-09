import { getTickets, sendData } from "@/utils/getData";
import { NextResponse } from "next/server";

export async function POST(req) {
  let url = "";
  let info = "";
  try {
    const { email, typeUrl, typeFunction, itilcategoriesId } = await req.json();

    if (!email || !typeUrl || !typeFunction) {
      return NextResponse.json(
        { error: "El email , el tipo de url y el tipo de funcion son requeridos.", ok: false, data: [] },
        { status: 400 }
      );
    }

    // Hacer la solicitud a la API externa
    if (typeUrl === "contact") {
      url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/search/contact`;
    }

    if (typeUrl === "getTickets") {
      url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/search/tickets`;
    }

    if (typeFunction === "send") {
      info = await sendData(url, email);
    }

    if (typeFunction === "get") {
      info = await getTickets(url, email, itilcategoriesId);
    }

    console.dir({ info }, { depth: null });
        

    if (!info.status) {
      return NextResponse.json({ status: false, data: [] }, { status: 200 });
    }

    return NextResponse.json(
      { status: info.status, data: info.res.data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Intente nuevamente mas tarde", ok: false, data: [] },
      { status: 500 }
    );
  }
}
