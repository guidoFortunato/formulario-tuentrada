// components/GoogleAnalytics.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { pageview } from "@/helpers/gtagHelper";

export default function GoogleAnalytics(id) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    pageview(id, url);
  }, [pathname, searchParams, id]);


  return (
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${id}', {
                    page_path: window.location.pathname,
                });
                `,
      }}
    />
  );
}
