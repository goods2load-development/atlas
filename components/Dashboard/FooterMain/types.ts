export interface FooterItem {
  title: string;
  href: string;
  children?: FooterItem[];
}

export interface FooterData {
  id: string;
  json: FooterItem[];
}
