import { Model } from 'mongoose';

export type MonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type titleType = 'Autumn' | 'Summer' | 'Fall';
export type academicCodeType = '01' | '02' | '03';

export type iAcademicSemester = {
  title: titleType;
  year: number;
  code: academicCodeType;
  startMonth: MonthType;
  endMonth: MonthType;
};

export type academicSemeterModel = Model<iAcademicSemester>;
