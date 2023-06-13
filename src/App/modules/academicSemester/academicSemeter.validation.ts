import { z } from 'zod';
import {
  academicSemesterMonth,
  academicSemesterTitles,
} from './academicSemester.constant';

//
//
const createAcademicSemeterZodShema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'title is required',
    }),

    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'code is required',
    }),

    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'endMonth is required',
      }
    ),
  }),
});

export const academicSemesterValidation = { createAcademicSemeterZodShema };