import { StaticImageData } from 'next/image';

export enum ILegacyDataBlockBodyType {
  PARAGRAPH,
  ULIST,
  OLIST,
  TABLE,
}

export interface ILegacyDataTableContentBody {
  columns: string[];
  rows: string[][];
}

export interface ILegacyDataBlockBody {
  type: ILegacyDataBlockBodyType;
  content?: string[];
  tableContent?: ILegacyDataTableContentBody;
  additionalContent?: ILegacyDataBlockBody[];
}

export interface ILegacyDataBlock {
  title?: string;
  body: ILegacyDataBlockBody[];
}

export interface ILegacyPage {
  title: string;
  subTitle?: string;
  bg: StaticImageData;
  data: ILegacyDataBlock[];
}
