import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const captchaResponse = await request.formData();
    const status = captchaResponse.get("status");
    let data = fs.readFileSync('src/logs/logs.json')
    let logs = JSON.parse(data)
    console.log({logs})

    const newLogs = Object.values(logs)
    console.log({newLogs})

    // const filePath = path.join(process.cwd(), "src/logs", "logs.json");

    // Convertir los datos a formato JSON
    // const jsonData = JSON.stringify(status);
    // fs.writeFile(filePath, jsonData);

    return NextResponse.json(
      { ok: true, message: "Realizado con éxito", data: "data" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
