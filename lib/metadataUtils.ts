import type { Metadata } from 'next';
import { headers } from 'next/headers';

export function generateDefaultMetadata(): Metadata {
  const headersList = headers();

  const clientUrl =
    process.env.NEXT_PUBLIC_CLIENT_URL || 'https://goods2load.com';

  const referer = headersList.get('referer');
  const xUrl = headersList.get('x-url');

  const canonical = referer || (xUrl ? `${clientUrl}${xUrl}` : clientUrl);
  const imageUrl = `${clientUrl}/thumbnail.png`;

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
          alt: 'Goods2load Thumbnail',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title: 'Goods2load',
      description:
        'Goods2load offers innovative logistics solutions for global trade.',
      images: [imageUrl],
    },
    alternates: {
      canonical,
    },
  };
}
