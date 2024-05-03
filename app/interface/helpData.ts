export interface HelpData {
  [key: string]: {
    question: string;
    description: string | JSX.Element;
    open: boolean;
  }[];
}
