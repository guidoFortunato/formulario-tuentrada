import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const errorPrefixes = [
    "100",
    "102",
    "103",
    "104",
    "105",
    "106",
    "110100",
    "110110",
    "110200",
    "110420",
    "110430",
    "110500",
    "110510",
    "11060",
    "11062",
    "120",
    "200010",
    "200100",
    "300",
    "600",
  ];
  // Mapa de códigos de error a mensajes

  const errorMessages = {
    "100": "Problemas de inicialización de la familia de códigos de error: Hubo un problema al inicializar Turnstile antes de que pudiera comenzar un desafío. Esto podría deberse a una instancia anterior del desafío que fue resuelta. Se recomienda recargar la página y reiniciar Turnstile. En fallos continuos, esto indica un dispositivo automatizado.",
    "102": "Familia de códigos de error Parámetros inválidos: El visitante envió un parámetro inválido como parte del desafío hacia Turnstile. Se recomienda reintentar el desafío. En fallos continuos, esto indica un dispositivo automatizado.",
    "103": "Familia de códigos de error Parámetros inválidos: El visitante envió un parámetro inválido como parte del desafío hacia Turnstile. Se recomienda reintentar el desafío. En fallos continuos, esto indica un dispositivo automatizado.",
    "104": "Familia de códigos de error Parámetros inválidos: El visitante envió un parámetro inválido como parte del desafío hacia Turnstile. Se recomienda reintentar el desafío. En fallos continuos, esto indica un dispositivo automatizado.",
    "105": "Familia de códigos de error Compatibilidad de la API de Turnstile: Turnstile fue invocado de una manera obsoleta o inválida. Se recomienda consultar la documentación de Turnstile nuevamente y actualizar la página para obtener la versión más reciente de Turnstile.",
    "106": "Familia de códigos de error Parámetros inválidos: El visitante envió un parámetro inválido como parte del desafío hacia Turnstile. Se recomienda reintentar el desafío. En fallos continuos, esto indica un dispositivo automatizado.",
    "110100": "Sitekey inválido: Turnstile fue invocado con un sitekey inválido o un sitekey que ya no está activo. Verifique si el sitekey proporcionado sigue activo.",
    "110110": "Sitekey inválido: Turnstile fue invocado con un sitekey inválido o un sitekey que ya no está activo. Verifique si el sitekey proporcionado sigue activo.",
    "110200": "Dominio no permitido: Turnstile fue utilizado en un dominio que no estaba permitido para este widget. Asegúrese de que el dominio donde se pretende utilizar Turnstile esté permitido en la configuración del widget.",
    "110420": "Acción no soportada o malformateada: Asegúrese de que la acción cumpla con la estructura especificada y contenga solo caracteres válidos y se adhiera a las limitaciones de longitud documentadas.",
    "110430": "cData inválido: El error “cData inválido” en Turnstile se refiere a un problema al procesar datos personalizados (cData). Asegúrese de que el cData cumpla con la estructura especificada y contenga solo caracteres válidos y se adhiera a las limitaciones de longitud documentadas.",
    "110500": "Navegador no soportado: Anime al visitante a actualizar su navegador o verificarlo de otra manera.",
    "110510": "Agente de usuario inconsistente: El visitante proporcionó un agente de usuario inconsistente durante el proceso de resolución de Turnstile. El visitante puede tener extensiones o configuraciones del navegador habilitadas para falsificar su agente de usuario y debe deshabilitarlas para continuar.",
    "11060": "Desafío caducado: El visitante tardó demasiado en resolver el desafío y el desafío caducó. Reintente el desafío. El visitante también puede tener el reloj del sistema configurado con una fecha incorrecta.",
    "11062": "Desafío interactivo caducado: Solo en modo visible: El visitante tardó demasiado en resolver el desafío interactivo y el desafío se volvió obsoleto. Restablezca el widget y reinícielo para darle al visitante la oportunidad de resolver el widget nuevamente.",
    "120": "Errores internos para empleados de Cloudflare: Solo encontrado por ingenieros de soporte de Cloudflare durante la depuración.",
    "200010": "Caché inválido: Alguna parte de Turnstile fue almacenada en caché accidentalmente. Anime al visitante a borrar su caché.",
    "200100": "Problema de tiempo: El reloj del visitante es incorrecto. Anime al visitante a configurar su reloj a la hora correcta.",
    "300": "Error genérico de ejecución del cliente: Ocurrió un error no especificado en el visitante mientras resolvía un desafío. Visitante potencialmente automatizado. Reintente el desafío. Después de múltiples fallos consecutivos, verifique al visitante de otra manera.",
    "600": "Fallo en la ejecución del desafío: Un visitante no pudo resolver un desafío de Turnstile. Visitante potencialmente automatizado. Reintente el desafío. Después de múltiples fallos consecutivos, verifique al visitante de otra manera.",
  };

  try {
    const captchaResponse = await request.formData();
    const status = captchaResponse.get("status");
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
      };
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2), "utf8");
    }

    // Leer y parsear el archivo logs.json
    let data = fs.readFileSync(filePath, "utf8");
    let logs = JSON.parse(data);

    // Verificar si el status es un código de error usando prefijos

    const isError = errorPrefixes.some((prefix) => status.startsWith(prefix));

    if (isError) {
      // Si el status es un código de error
      let errorLog = logs.error.find((log) => log.code === status);

      if (errorLog) {
        // Si el código de error ya existe, incrementar la cantidad
        errorLog.quantity = (parseInt(errorLog.quantity) + 1).toString();
      } else {
        // Si el código de error no existe, añadir un nuevo objeto de error
        const errorMessage = Object.keys(errorMessages).find((key) =>
          status.startsWith(key)
        );

        logs.error.push({
          code: status,
          quantity: "1",
          message: errorMessages[errorMessage],
        });
      }
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
