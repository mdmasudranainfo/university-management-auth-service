import { Model, Schema, model } from 'mongoose';
import {
  academicSemeterModel,
  iAcademicSemester,
} from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitles,
} from './academicSemester.constant';

export const academicSemesterSchema = new Schema<iAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonth },
    endMonth: { type: String, required: true, enum: academicSemesterMonth },
  },
  {
    timestamps: true,
  }
);

export const academicSemester = model<iAcademicSemester, academicSemeterModel>(
  'academicSemester',
  academicSemesterSchema
);
