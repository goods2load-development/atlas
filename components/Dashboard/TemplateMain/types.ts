// Interface for Achievements
interface Achievement {
  label: string;
  value: string;
}

// Interface for Blocks
interface Block {
  title: string;
  description: string;
  video?: string; // optional field
}

// Interface for Dropdown Items
interface DropdownItem {
  title: string;
  description: string;
}

// Interface for Dropdown
interface Dropdown {
  title: string;
  items: DropdownItem[];
}

// Interface for Meta Information
interface Meta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Main Template Interface
interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  block1File: string;
  block2File: string;
  achievements: Achievement[];
  blocks: Block[];
  dropdown: Dropdown;
}

// Main Data Response Interface (to include pagination)
interface TemplateResponse {
  data: Template[];
  meta: Meta;
}
