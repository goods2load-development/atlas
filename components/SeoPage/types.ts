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

export interface SeoPageCategory {
  id: string;
  name: string;
}

export interface SeoPage {
  id: string;
  title: string;
  category: SeoPageCategory;
  description: string;
  block1File: string;
  block2File: string;
  blocks: Block[];
  achievements: Achievement[];
  industryText: string;
  getStartedText: string;
  dropdown: {
    title: string;
    items: DropdownItem[];
  };
}
