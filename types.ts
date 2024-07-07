import { Category, Course, Profile } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string,position:number }[];
    progress: number | null;
};

export type SafeProfile = Omit<
  Profile,
  "createdAt" | "updatedAt" 
> & {
  createdAt: string;
  updatedAt: string;
};