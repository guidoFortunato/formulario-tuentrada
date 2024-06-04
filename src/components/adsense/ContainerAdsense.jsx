import dynamic from "next/dynamic";
const AdBanner = dynamic(() => import("./AdBanner"), {
  ssr: false,
});

export const ContainerAdsense = () => {
  return (
    <AdBanner
      data-ad-slot="4322497970"
      data-full-width-responsive="true"
      data-ad-layout="in-article"
      data-ad-format="fluid"
    />
  );
};
