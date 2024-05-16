import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const errorPrefixes = [
    "100", "102", "103", "104", "105", "106", 
    "110100", "110110", "110200", "110420", "110430", 
    "110500", "110510", "11060", "11062", "120", 
    "200010", "200100", "300", "600"
  ];

  try {
    const captchaResponse = await request.formData();
    const status = captchaResponse.get("status");

     // Ruta del archivo logs.json
    const filePath = path.join(process.cwd(), "src/logs", "logs.json");

    // Leer y parsear el archivo logs.json
    let data = fs.readFileSync(filePath, 'utf8')
    let logs = JSON.parse(data)

   // Verificar si el status es un código de error usando prefijos

   const isError = errorPrefixes.some( prefix => status.startsWith(prefix) )

   if (isError) {
    // Si el status es un código de error
    let errorLog = logs.error.find( log => log.code === status)

    if (errorLog) {
      // Si el código de error ya existe, incrementar la cantidad
      errorLog.quantity = (parseInt(errorLog.quantity) + 1).toString()
    }else{
      // Si el código de error no existe, añadir un nuevo objeto de error
      logs.error.push({ code: status, quantity: "1" })
    }
    
   }else{
    // Si el status es un token, incrementar el contador de success
    logs.success = (parseInt(logs.success) + 1).toString();
   }

   // Convertir los datos a formato JSON y guardar en logs.json
   fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), 'utf8');

    return NextResponse.json(
      { ok: true, message: "Realizado con éxito", data: "data" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
