type UrlEntry = {
  loc: string;
  title: string;
  subCategory?: string;
};

export type SitemapResult = {
  [category: string]: UrlEntry[];
};

export const parseSitemap = (xmlDoc: Document): SitemapResult => {
  const urls = xmlDoc.getElementsByTagName('url');
  const result: SitemapResult = {};

  for (let i = 0; i < urls.length; i++) {
    const urlElement = urls[i];

    const loc = urlElement.getElementsByTagName('loc')[0]?.textContent;
    const category = urlElement.getElementsByTagName('category')[0]
      ?.textContent as string;
    const title = urlElement.getElementsByTagName('title')[0]
      ?.textContent as string;
    const subCategory = urlElement.getElementsByTagName('subcategory')[0]
      ?.textContent as string;

    if (!result[category]) {
      result[category] = [];
    }

    result[category].push({
      loc: loc ? removeDomainFromUrl(loc) : '',
      title: title || '',
      subCategory: subCategory || '',
    });
  }

  return result;
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
