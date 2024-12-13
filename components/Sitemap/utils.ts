type UrlEntry = {
  url: string;
  title: string;
  subCategory?: string;
};

export type SitemapResult = {
  [category: string]: UrlEntry[];
};

export const removeDomainFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
  } catch (error) {
    console.error('Invalid URL:', error);
    return url;
  }
};

export const groupBySubCategory = (items: UrlEntry[]): UrlEntry[][] => {
  const grouped: { [key: string]: UrlEntry[] } = {};

  items?.forEach((item) => {
    const subCategory = item.subCategory as string;

    if (!grouped[subCategory]) {
      grouped[subCategory] = [];
    }

    grouped[subCategory].push(item);
  });

  return Object.values(grouped);
};
