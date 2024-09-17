import { NextResponse } from "next/server";


export async function GET(params) {
  return NextResponse.json(
    { ok: true, message: "Realizado con éxito" },
    { status: 200 }
  );
}