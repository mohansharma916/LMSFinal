import { db } from "@/lib/db";
import { NextPage } from "next";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

const CourseIdPage: NextPage<{ params: { courseId: string } }> = async ({
  params
}: {
  params: { courseId: string; }
}) => {



try{


  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });



  if (!course) {
    redirect("/");
    return null
  }

   redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
   return null
}catch(error){
  console.log("Something Went Wrong",error)
}
return null
  
}




 
export default CourseIdPage;