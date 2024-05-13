"use client";

import { Adsense } from "@ctrl/react-adsense";
import { useEffect } from "react";
import { GoogleAdSense } from "next-google-adsense";
import { AdUnit } from "next-google-adsense";
import { LayoutAdsense } from "./LayoutAdsense";

const AdSense = () => {
  useEffect(() => {
    if (window) {
      if (window.adsbygoogle && !window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }, []);

  return (
    <div className="px-5 pb-5 ">
      <AdUnit
        publisherId="pub-3241865431125040"  
        slotId="4322497970"                 
        layout="custom"
        customLayout={<LayoutAdsense />}
        />
      {/* <GoogleAdSense
        client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        slot="4322497970"
        style={{ display: "block", textAlign: "center", marginBottom:"20px" }}
        layout="in-article"
        format="fluid"
      /> */}
      {/* <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", marginBottom:"20px" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-3241865431125040"
      data-ad-slot="4322497970"
    ></ins> */}
    </div>
  );
};

export default AdSense;
