export interface FooterItem {
  title: string;
  href: string;
  children?: FooterItem[];
}

export interface HeaderFooterData {
  id: string;
  json: FooterItem[];
}
