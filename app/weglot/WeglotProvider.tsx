import { COOKIE_KEY_LANG, Langs } from '@/lib/types';

import { cookies } from 'next/headers';
import Script from 'next/script';

export const WeglotProvider = async () => {
  const cookieStore = await cookies();
  const currentLang = cookieStore.get(COOKIE_KEY_LANG);

  if (!currentLang || currentLang.value === Langs.EN) {
    return null;
  }

  return (
    <>
      <link
        rel="preconnect"
        href="https://cdn.weglot.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://cdn.weglot.com" />
      <Script
        strategy="beforeInteractive"
        src="https://cdn.weglot.com/weglot.min.js"
      />
      <Script
        id="weglot-init"
        dangerouslySetInnerHTML={{
          __html: `
            Weglot.initialize({
              api_key: '${process.env.WEGLOT_API_KEY}'
            });
          `,
        }}
      />
    </>
  );
};
