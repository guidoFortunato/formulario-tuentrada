"use client";

import { useEffect } from "react";

const AdSense = () => {
  useEffect(() => {
    if (window) {
      if (window.adsbygoogle && !window.adsbygoogle.loaded){
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }, []);

  return (
   <div className="px-5 pb-5 ">
     <ins
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center", marginBottom:"20px" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-3241865431125040"
      data-ad-slot="4322497970"
    ></ins>
   </div>
);

};

export default AdSense;


/*
"use client";

import { useEffect, useState } from "react";

const AdSense = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (window) {
      if (window.adsbygoogle && !window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setMounted(true);
      }
    }
  }, [mounted]);

  return (
    <div className="px-5 pb-5 ">
      {mounted && (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "20px",
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-3241865431125040"
          data-ad-slot="4322497970"
        ></ins>
      )}
    </div>
  );
};

export default AdSense;

*/ 
