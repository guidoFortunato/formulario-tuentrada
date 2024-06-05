"use client";

import Router from "next/router";
import { useEffect } from "react";

const AdBanner = (props) => {
  useEffect(() => {
    const handleRouteChange = () => {
      const intervalId = setInterval(() => {
        try {
          // Check if the 'ins' element already has an ad in it
          if (window.adsbygoogle) {
            window.adsbygoogle.push({});
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error pushing ads: ", err);
          clearInterval(intervalId); // Ensure we clear interval on errors too
        }
      }, 100);
      return () => clearInterval(intervalId); // Clear interval on component unmount
    };

    // Run the function when the component mounts
    handleRouteChange();

    // Subscribe to route changes
    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", handleRouteChange);

      // Unsubscribe from route changes when the component unmounts
      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  return (
    <>
      <div>
      <h2 className="text-center text-gray-400 pb-1 text-xs">ANUNCIO PUBLICITARIO</h2>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
          marginBottom: "20px",
          overflow: "hidden",
          // border: process.env.NODE_ENV_ADSENSE === "development" ? "1px solid red" : "none",
          // background: process.env.NODE_ENV_ADSENSE === "development" ? "rgba(255, 0, 0, 0.1)" : "none",
        }}
        data-adtest="on"
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
        {...props}
      />
      </div>
    </>
  );
};
export default AdBanner;
