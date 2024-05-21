import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const captchaResponse = await request.formData();
    let status = captchaResponse.get("status");
    const headersList = headers();
    const userAgent = headersList.get("user-agent");
    const ip = request.ip === undefined ? "unknown" : request.ip;

    // Convertir el status a un array si no es un string vacío
    if (status.length > 0) {
      status = [status];
    }

    const date = new Date().toLocaleString().split(",")[0].split("/").join("_");

    // Ruta de la carpeta logs y el archivo recaptcha_*.json
    const logsDir = path.join(process.cwd(), "public/logs");
    const filePath = path.join(logsDir, `recaptcha_${date}.json`);

    // Crear la carpeta logs si no existe
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Verificar si el archivo existe y su antigüedad
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const createdAt = new Date(stats.birthtime);
      const now = new Date();
      const daysOld = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

      if (daysOld > 7) {
        fs.unlinkSync(filePath);
      }
    }

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      // Si el archivo no existe, crear un archivo con estructura inicial
      const initialData = {
        success: "0",
        error: [],
        time: new Date().toLocaleDateString(),
      };
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8");
    }

    // Leer y parsear el archivo logs.json
    let data = fs.readFileSync(filePath, "utf8");
    let logs = JSON.parse(data);

    // Verificar si el status es un código de error
    if (status.length > 0) {
      status.forEach((code) => {
        let errorLog = logs.error.find((log) => log.code === code);

        if (errorLog) {
          // Si el código de error ya existe, incrementar la cantidad
          errorLog.quantity = (parseInt(errorLog.quantity) + 1).toString();
          errorLog.ip.push(ip);
          errorLog.userAgent.push(userAgent);
        } else {
          // Si el código de error no existe, añadir un nuevo objeto de error
          logs.error.push({
            code: code,
            quantity: "1",
            message: `Código de error: ${code}`,
            ip: [ip],
            userAgent: [userAgent],
          });
        }
      });
    } else {
      // Si el status es un token, incrementar el contador de success
      logs.success = (parseInt(logs.success) + 1).toString();
    }

    // Convertir los datos a formato JSON y guardar en logs.json
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), "utf8");

    return NextResponse.json(
      { ok: true, message: "Recaptcha realizado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error }, { status: 500 });
  }
}
