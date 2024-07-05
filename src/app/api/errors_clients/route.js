import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const req = new NextRequest(request)
    const headersList = headers();
    const userAgent = headersList.get("user-agent");
    const ip = request.ip === undefined ? "unknown" : request.ip;
    const { email, content, error } = request.body;
    const date = new Date().toLocaleString().split(",")[0].split("/").join("_");
    console.log({req})

    // Ruta de la carpeta logs y el archivo recaptcha_*.json
    const logsDir = path.join(process.cwd(), "public/logs");
    const filePath = path.join(logsDir, `errors_clients_${date}.json`);

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
        error: [],
        time: new Date().toLocaleDateString(),
      };
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8");
    }

    // Leer y parsear el archivo logs.json
    let data = fs.readFileSync(filePath, "utf8");
    let logs = JSON.parse(data);

    // Verificar si el email ya existe
    let emailClient = logs.error.find((log) => log.email === email);

    if (emailClient) {

      emailClient.quantity = (parseInt(emailClient.quantity) + 1).toString();
      emailClient.ip.push(ip);
      emailClient.userAgent.push(userAgent);
      emailClient.content.push(content);
      emailClient.error.push(error);

    } else {

      // Si el email no existe, añadir un nuevo cliente
      logs.error.push({
        email: email,
        quantity: "1",
        content: [content],
        ip: [ip],
        userAgent: [userAgent],
        error: [error],
      });

    }
    // Convertir los datos a formato JSON y guardar en logs.json
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2), "utf8");

    return NextResponse.json(
      { ok: true, message: "Realizado con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error }, { status: 500 });
  }
}
