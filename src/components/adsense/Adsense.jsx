"use client";

import { Adsense } from "@ctrl/react-adsense";
import { useEffect } from "react";

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
      <Adsense
        client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        slot="4322497970"
        style={{ display: "block", textAlign: "center", marginBottom:"20px" }}
        layout="in-article"
        format="fluid"
      />
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
