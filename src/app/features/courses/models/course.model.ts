export interface ICourseModel {
  id: string;
  category: string,
  name: string;
  nameDe: string;
  language: string,
  languageDe: string;
  description: string;
  descriptionDe: string;
  dates: {
    startDate: string;
    endDate: string;
  }[]
  img: string;
  thumbnail: string;
  price: number;
  attendanceTimes: string;
  attendanceTimesDe: string;
  duration: string;
  durationDe: string;
  level: string;
  levelDe: string;
  location: string;
  requirements: string;
  requirementsDe: string;
  technologies: {
    techName: string;
    techNameDe: string;
    techTags: string;
  }[];
  financingOptions: {
    name: string;
    nameDe: string;
    img: string;
  }[];
}
