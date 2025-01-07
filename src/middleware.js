import { NextResponse } from 'next/server';

export function middleware(request) {
  // Obtener el header x-forwarded-host
  const forwardedHost = request.headers.get('x-forwarded-host');
  
  // Si existe y contiene :443, lo limpiamos
  if (forwardedHost && forwardedHost.includes(':443')) {
    const sanitizedHost = forwardedHost.replace(':443', '');
    const headers = new Headers(request.headers);
    headers.set('x-forwarded-host', sanitizedHost);

    // Crear una nueva request con los headers actualizados
    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  }

  return NextResponse.next();
}

// Opcionalmente, puedes configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    // Solo las rutas que usan Server Actions o tienen problemas con headers
    '/[categoria]/[subcategoria]/formulario/:path*', // Para los formularios
    '/api/proxy/:path*',                            // Para las búsquedas y formularios proxy
  ]
}; 