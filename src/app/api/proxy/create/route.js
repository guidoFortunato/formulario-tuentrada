import { createTicket } from "@/utils/getData";

export async function POST(req) {
  try {
    const { formData } = await req.json();
    
    if (!formData) {
      return NextResponse.json(
        { error: "El formulario es requerido.", ok: false, data: [] },
        { status: 400 }
      );
    }

    const url = `${process.env.ENDPOINT_API}/api/v1/atencion-cliente/create/form`;
    const info = await createTicket(url, formData);

    if (!info.status) {
      return NextResponse.json({ status: false, data: [] }, { status: 200 });
    }

    console.dir({ info }, { depth: null });

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
