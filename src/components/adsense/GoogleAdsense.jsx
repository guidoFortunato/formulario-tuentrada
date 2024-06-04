import Script from "next/script";

const GoogleAdsense = ({ pId = "3241865431125040" }) => {
  if (process.env.NODE_ENV_ADSENSE !== "production") {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdsense;