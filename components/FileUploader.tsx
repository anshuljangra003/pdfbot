"use client"
import { CircleArrowDown, RocketIcon } from 'lucide-react'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function FileUploader() {
    const onDrop = useCallback((acceptedFiles:File[]) => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive,isFocused,isDragAccept} = useDropzone({onDrop})
  return (
    <div className='flex flex-col gap-4 items-center max-w-7xl mx-auto'>
        <div {...getRootProps()} className={`flex p-10 border-2 border-dashed mt-10 w-[90%] font-bold justify-center items-center cursor-pointer rounded-lg border-teal-500 text-indigo-600 h-96 ${isFocused || isDragAccept ? "bg-indigo-200":"bg-indigo-100"}`}>
      <input {...getInputProps()} />
      <div className='flex flex-col items-center'>

      {
          isDragActive ?(
              <>
        <RocketIcon className='animate-ping h-20 w-20 py-5 '/>
          <p>Drop the files here ...</p> 
        </>
        
    ):(
        <>
        <CircleArrowDown className='animate-bounce h-10 w-10  '/>
        <p >Drag n drop some files here, or click to select files</p>
        </>
    )}
    </div>
    </div>
    </div>
  )
}

export default FileUploader