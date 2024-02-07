import Script from 'next/script'
import React from 'react'

export const Recaptcha = () => {
  return (
    <>
        <Script
            src='https://challenges.cloudflare.com/turnstile/v0/api.js'
            async
            defer
        ></Script>
        <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} data-language="es"></div>
    </>
  )
}
