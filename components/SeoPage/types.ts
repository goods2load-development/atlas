interface Block {
  title: string;
  description: string;
  video?: string;
}

export interface DropdownItem {
  title: string;
  description: string;
  number?: string;
}

interface Achievement {
  label: string;
  value: string;
}

export interface SeoPage {
  id: string;
  title: string;
  category: string;
  description: string;
  block1File: string;
  block2File: string;
  blocks: Block[];
  achievements: Achievement[];
  dropdown: {
    title: string;
    items: DropdownItem[];
  };
}
