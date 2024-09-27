import { FooterItem } from "./types";

export function mapHrefs(data: FooterItem[]): string[] {
  const hrefs: string[] = [];

  const getHrefs = (items: FooterItem[]) => {
    items.forEach((item) => {
      hrefs.push(item.href);

      if (item.children && item.children.length > 0) {
        getHrefs(item.children);
      }
    });
  };

  getHrefs(data);

  return hrefs;
}

export const deleteItemByHref = (
  footerData: FooterItem[],
  href: string
): FooterItem[] => {
  return footerData.reduce<FooterItem[]>((acc, item) => {
    if (item.href === href) {
      return acc;
    }

    const updatedChildren = item.children
      ? deleteItemByHref(item.children, href)
      : [];

    acc.push({ ...item, children: updatedChildren });
    return acc;
  }, []);
};

export const addItemToChildrenByHref = (
  footerData: FooterItem[],
  parentHref: string,
  newItem: { href: string; title: string }
): FooterItem[] => {
  if (!parentHref) {
    return [...footerData, newItem];
  }

  return footerData.map((item) => {
    if (item.href === parentHref) {
      const updatedChildren = item.children
        ? [...item.children, newItem]
        : [newItem];
      return { ...item, children: updatedChildren };
    }

    if (item.children) {
      return {
        ...item,
        children: addItemToChildrenByHref(item.children, parentHref, newItem),
      };
    }

    return item;
  });
};

export const editItemByHref = (
  footerData: FooterItem[],
  href: string,
  updatedData: { href?: string; title?: string }
): FooterItem[] => {
  return footerData.map((item) => {
    if (item.href === href) {
      return {
        ...item,
        ...updatedData,
      };
    }

    if (item.children) {
      return {
        ...item,
        children: editItemByHref(item.children, href, updatedData),
      };
    }

    return item;
  });
};

export const replaceChildrenByHref = (
  items: FooterItem[],
  targetHref: string,
  newChildren: FooterItem[]
): FooterItem[] => {
  const isHasHref = items.find((item) => item.href === targetHref);

  if (isHasHref) return newChildren;

  return items.map((link) => {
    if (link?.children?.length) {
      return {
        ...link,
        children: replaceChildrenByHref(link.children, targetHref, newChildren),
      };
    }

    return link;
  });
};

export const filterRoutes = (routes: string[]) =>
  routes.filter(
    (route) =>
      !route.includes("dashboard") && !route.includes("[") && route !== "/"
  );
