interface Block {
  title: string;
  description: string;
  video?: string;
}

interface DropdownItem {
  title: string;
  description: string;
}

export interface SeoPage {
  id: string;
  title: string;
  category: string;
  description: string;
  block1File: string;
  block2File: string;
  blocks: Block[];
  dropdown: {
    items: DropdownItem[];
  };
}
