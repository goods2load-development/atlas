import Script from 'next/script';

export const WeglotProvider = () => {
  return (
    <>
      <Script
        src="https://cdn.weglot.com/weglot.min.js"
        // strategy="lazyOnload"
      />
      <Script
        id="weglot-init"
        // strategy="lazyOnload"
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
