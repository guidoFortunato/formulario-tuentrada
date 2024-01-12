"use client"

import { useEffect } from "react";

const AdSense2 = () => {
  useEffect(() => {
    if (window) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <ins className="adsbygoogle"
    style={{ display: "block", textAlign: "center" }}
    data-ad-layout="in-article"
    data-ad-format="fluid"
    data-ad-client="ca-pub-3241865431125040"
    data-ad-slot="4322497970"></ins>
  );
};

export default AdSense2;