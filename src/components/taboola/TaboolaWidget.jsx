// src/components/taboola/TaboolaWidget.jsx
"use client";

import Router from "next/router";
import { useEffect } from "react";

const TaboolaWidget = () => {
  useEffect(() => {
    const handleRouteChange = () => {
      const intervalId = setInterval(() => {
        try {
          if (window._taboola) {
            // Push the widget configuration
            window._taboola.push({
              mode: 'alternating-thumbnails-test',
              container: 'taboola-below-article-thumbnails',
              placement: 'Below Article Thumbnails',
              target_type: 'mix',
              flush: true
            });
            
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error pushing Taboola widget: ", err);
          clearInterval(intervalId);
        }
      }, 100);
      return () => clearInterval(intervalId);
    };

    // Run when component mounts
    handleRouteChange();

    // Handle route changes
    if (typeof window !== "undefined") {
      Router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        Router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, []);

  return (
    <div>
      {/* <h2 className="text-center text-gray-400 pb-1 text-xs">CONTENIDO RECOMENDADO</h2> */}
      <div 
        id="taboola-below-article-thumbnails"
        style={{
          marginBottom: "20px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default TaboolaWidget;