// components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";
import * as gtag from "@/helpers/gtagHelper";

export default function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      });
                    `,
        }}
      />
      {/* <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=${id}`}/>
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
      /> */}
    </>
  );
}
