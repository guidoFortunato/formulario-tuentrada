import Script from 'next/script'
import React from 'react'

export const Recaptcha = () => {
    const handleClick = (e)=>{
        console.log({e})
    }
  return (
    <>
        <Script
            src='https://challenges.cloudflare.com/turnstile/v0/api.js'
            async
            defer
        ></Script>
        <div className="cf-turnstile" data-sitekey="1x00000000000000000000AA" data-language="es" onClick={ handleClick }></div>
    </>
  )
}
