"use client";

import toast from "react-hot-toast";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

interface FileUploadProps {
  onChange: (url?: string, originalFilename?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const VideoUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {


  const [videoUrl,setVideoUrl]=useState("")
  return (
    <>
    <Input placeholder="Please Paste Chapter Video Url Here " onChange={(e)=>{setVideoUrl(e.target.value)}} />
    <Button  onClick={()=>onChange(videoUrl)}>Submit Video</Button>
    </>



    
  );
}