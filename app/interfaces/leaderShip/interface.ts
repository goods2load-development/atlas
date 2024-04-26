import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";

interface ILeaderImg {
  blurDataURL: string;
  blurHeight: number;
  blurWidth: number;
  height: number;
  src: string;
  width: number;
}

export interface ILeader {
  personalInfo: ILeaders;
}

export interface ILeaders {
  img: ILeaderImg;
  name: string;
  position: string;
}

export interface Leadership {
  img: StaticImageData;
  name: string;
  position: string;
  info: string;
}
export interface CompanyLeaderShipCard {
  pesonalInfo: Leadership;
}
export interface CompanyLeader {
  item: Leadership;
}
export interface ModalCareer {
  pesonalInfo: SalesChallenge;
  key: number;
}
export interface SalesChallenge {
  modalName: string;
  challengeName: string;
  workingName: string;
  tittle: string;
  description: string;
  options: ChallengeOption[];
}
interface ChallengeOption {
  optionName: string;
  optionText: string;
  additionText: string;
}