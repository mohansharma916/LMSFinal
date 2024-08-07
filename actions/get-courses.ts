
import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";

import { CourseWithProgressWithCategory } from "@/types";

type GetCourses = {
  userId?: string|null;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
                    contains: title,
                    mode: "insensitive",
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            position:true
          }
        },
        purchases: {
          where: {
            ...(userId && { userId }),
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });
    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        if (course?.purchases?.length === 0) {
          return {
            ...course,
            progress: null, // make progress possibly null
          };
        }



        if (userId && course?.purchases?.length !==0){
          const progressPercentage = await getProgress(userId, course.id);
    
          return {
            ...course,
            progress: progressPercentage,
          };

        }
    
       
    
        return {
          ...course,
          progress: null,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}
