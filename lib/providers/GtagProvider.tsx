'use client';

import { useEffect } from 'react';

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_GTAG_SECRET;

const GTMProvider = () => {
  useEffect(() => {
    const gtmScript = document.createElement('script');
    gtmScript.type = 'text/javascript';
    gtmScript.id = 'google-tag-manager';
    gtmScript.async = true;
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');
    `;
    document.head.appendChild(gtmScript);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
  }, []);

  return null;
};

export default GTMProvider;
