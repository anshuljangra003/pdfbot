"use client";
import useUpload from '@/hooks/useUpload';
import { CircleArrowDown, RocketIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploader() {
  const { progress, status, fileId, handleUpload } = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    const file = acceptedFiles[0];
    if (file) {
      await handleUpload(file);
    }
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"]
    }
  });

  useEffect(() => {
    console.log(progress)
  }, [progress]);

  const uploadProgress = progress != null && progress >= 0 && progress <= 100;

  return (
    <div className='flex flex-col gap-4 items-center max-w-7xl mx-auto'>
      {uploadProgress && (
        <div className='mt-32 flex flex-col justify-center items-center gap-5'>
          <div className={`radial-progress bg-indigo-300 text-white border-4 ${progress === 100 && "hidden"}`} style={{ "--value": progress, "--size": "12rem", "--thickness": "2px" }} role="progressbar">
            {progress}%
          </div>
        </div>
      )}

      {!uploadProgress && (
        <div {...getRootProps()} className={`flex p-10 border-2 border-dashed mt-10 w-[90%] font-bold justify-center items-center cursor-pointer rounded-lg border-teal-500 text-indigo-600 h-80 ${isFocused || isDragAccept ? "bg-indigo-200" : "bg-indigo-100"}`}>
          <input {...getInputProps()} />
          <div className='flex flex-col items-center'>
            {isDragActive ? (
              <>
                <RocketIcon className='animate-ping h-20 w-20' />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <CircleArrowDown className='animate-bounce h-10 w-10' />
                <p>Drag n drop some files here</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
