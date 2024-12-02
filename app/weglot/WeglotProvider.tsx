import Script from 'next/script';

export const WeglotProvider = () => {
  return (
    <>
      <Script src="https://cdn.weglot.com/weglot.min.js" async />
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
