"use client";

import { useContext, useEffect } from "react";
import dompurify from "isomorphic-dompurify";
import { FormContext } from "@/context/FormContext";
import { Loader } from "../loading";

const AdSense = () => {
  const { dataSite } = useContext(FormContext);
  const sanitizer = dompurify.sanitize;

  // const ins = dataSite?.scripts[0];
  // console.log(dataSite?.scripts[0])

  useEffect(() => {
    if (window) {
      if (window.adsbygoogle && !window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }, []);
  if (dataSite === undefined) return <Loader />;
  if (dataSite.length === 0) return <Loader />;

  

  return (
    <>{dataSite?.scripts[0] ? (
      <div
      dangerouslySetInnerHTML={{
        __html: sanitizer(dataSite?.scripts[0].scrips),
      }}
      >

      </div>
    ) : <span className="hidden"></span>}</>
    //  <div className="px-5 pb-5 ">
    //    <ins
    //     className="adsbygoogle"
    //     style={{ display: "block", textAlign: "center", marginBottom:"20px" }}
    //     data-ad-layout="in-article"
    //     data-ad-format="fluid"
    //     data-ad-client="ca-pub-3241865431125040"
    //     data-ad-slot="4322497970"
    //   ></ins>
    //  </div>
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
