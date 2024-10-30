import { FooterItem } from './types';

export const deleteItemByTitle = (
  footerData: FooterItem[],
  title: string,
): FooterItem[] => {
  return footerData.reduce<FooterItem[]>((acc, item) => {
    if (item.title === title) {
      return acc;
    }

    const updatedChildren = item.children
      ? deleteItemByTitle(item.children, title)
      : [];

    acc.push({ ...item, children: updatedChildren });
    return acc;
  }, []);
};

export const addItemToChildrenByTitle = (
  footerData: FooterItem[],
  parentTitle: string,
  newItem: { href: string; title: string },
): FooterItem[] => {
  if (!parentTitle) {
    return [...footerData, newItem];
  }

  return footerData.map((item) => {
    if (item.title === parentTitle) {
      const updatedChildren = item.children
        ? [...item.children, newItem]
        : [newItem];
      return { ...item, children: updatedChildren };
    }

    if (item.children) {
      return {
        ...item,
        children: addItemToChildrenByTitle(item.children, parentTitle, newItem),
      };
    }

    return item;
  });
};

export const editItemByTitle = (
  footerData: FooterItem[],
  title: string,
  updatedData: { href?: string; title?: string },
): FooterItem[] => {
  return footerData.map((item) => {
    if (item.title === title) {
      return {
        ...item,
        ...updatedData,
      };
    }

    if (item.children) {
      return {
        ...item,
        children: editItemByTitle(item.children, title, updatedData),
      };
    }

    return item;
  });
};

export const replaceChildrenByTitle = (
  items: FooterItem[],
  targetTitle: string,
  newChildren: FooterItem[],
): FooterItem[] => {
  const isHasTitle = items.find((item) => item.title === targetTitle);

  if (isHasTitle) return newChildren;

  return items.map((link) => {
    if (link?.children?.length) {
      return {
        ...link,
        children: replaceChildrenByTitle(
          link.children,
          targetTitle,
          newChildren,
        ),
      };
    }

    return link;
  });
};

export const filterRoutes = (routes: string[]) =>
  routes.filter(
    (route) =>
      !route.includes('dashboard') && !route.includes('[') && route !== '/',
  );

export async function getAllRoutes() {
  try {
    const response = await fetch(`/dynamic-sitemap-0.xml`);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    const urlNodes = xmlDoc.getElementsByTagName('url');

    const routes = Array.from(urlNodes)
      .map((urlNode) => {
        const loc = urlNode.getElementsByTagName('loc')[0]?.textContent;
        if (loc) {
          const url = new URL(loc);
          return url.pathname;
        }
        return null;
      })
      .filter(Boolean) as string[];

    return filterRoutes(routes);
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}
