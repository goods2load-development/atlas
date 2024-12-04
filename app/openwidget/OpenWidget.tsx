'use client';

import { useEffect, useState } from 'react';

const OpenWidget = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isLoaded && window.scrollY > 100) {
        loadScripts();
        setIsLoaded(true);
      }
    };

    const loadScripts = () => {
      const script = document.createElement('script');
      script.id = 'openwidget-config';
      script.type = 'text/javascript';
      script.innerHTML = `
        window.__ow = window.__ow || {};
        window.__ow.organizationId = "${process.env.NEXT_PUBLIC_OPENWIDGET_ORGANIZATION_ID}";
        window.__ow.integration_name = "manual_settings";
        window.__ow.product_name = "openwidget";
              
        ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice));
        `;

      document.head.appendChild(script);

      const scriptOpenwidget = document.createElement('script');
      scriptOpenwidget.src = 'https://cdn.openwidget.com/openwidget.js';
      scriptOpenwidget.async = true;
      document.head.appendChild(scriptOpenwidget);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded]);

  return null;
};

export default OpenWidget;
