"use client";

import { GoogleTagManager } from "@next/third-parties/google";

export const TagManager = ({ dataSite }) => {
  // console.log({dataSite})

  if (dataSite === undefined) return <span />;
  if (dataSite.length === 0) return <span />;

  return <GoogleTagManager gtmId={dataSite.tagManager} />;
};
