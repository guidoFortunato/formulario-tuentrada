export const pageview = (id, url ) => {
  window.gtag("config", id, {
      page_path: url,
  });
};