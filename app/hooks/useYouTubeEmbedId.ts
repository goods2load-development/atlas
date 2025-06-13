import { useEffect, useState } from 'react';

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1];
      }
    }

    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function useYouTubeEmbedId(
  link: string,
  delay: number = 500,
): string | null {
  const [embedId, setEmbedId] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      const id = extractYouTubeVideoId(link);
      setEmbedId(id);
    }, delay);

    return () => clearTimeout(handler);
  }, [link, delay]);

  return embedId;
}
