import { FooterItem } from "./types";

export const deleteItemByTitle = (
  footerData: FooterItem[],
  title: string
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
  newItem: { href: string; title: string }
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
  updatedData: { href?: string; title?: string }
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
  newChildren: FooterItem[]
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
          newChildren
        ),
      };
    }

    return link;
  });
};
