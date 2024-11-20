import { headers } from 'next/headers';

export function generateDefaultMetadata() {
  const requestHeaders = headers();
  const canonical =
    requestHeaders.get('referer') ||
    `${process.env.NEXT_PUBLIC_CLIENT_URL}${requestHeaders.get('x-url')}` ||
    'https://goods2load.com';
  const imageUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/thumbnail.png`;

  return {
    title: 'Goods2load',
    description: 'Goods2load offers innovative logistics solutions.',
    openGraph: {
      title: 'Goods2load',
      description:
        'Goods2load offers innovative logistics solutions for global trade.',
      url: canonical,
      images: [
        {
          url: imageUrl,
          alt: 'Goods2load',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: 'Goods2load',
      description:
        'Goods2load offers innovative logistics solutions for global trade.',
      images: imageUrl,
    },
    alternates: {
      canonical,
    },
  };
}
