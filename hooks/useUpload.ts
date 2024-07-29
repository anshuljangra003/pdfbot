"use client"
import { db, storage } from '@/firebase';
import { useUser } from '@clerk/nextjs'
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export enum StatusText{
    UPLOADING="Uploading File...",
    UPLOADED="File Uploaded Successfully",
    SAVING="Saving File",
    GENERATING="Generating AI embeddings.Wait for few seconds"
}

export type Status=StatusText[keyof StatusText]


function useUpload() {
    const [progress, setprogress] = useState<number|null>(null)
    const [fileId, setfileId] = useState<string|null>(null)
    const [status, setstatus] = useState<string|null>(null)
    const {user}=useUser();
    const router=useRouter();

    const handleUpload=async(file:File)=>{
        if(!file || !user)return;

        const id=uuidv4();
        const storageRef=ref(storage,`users/${user.id}/files/${id}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              setprogress(percent)
              setstatus(StatusText.UPLOADING)   
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
          
                // ...
          
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, 
            async() => {
              // Upload completed successfully, now we can get the download URL
              setstatus(StatusText.UPLOADED)
              const downloadURL=await getDownloadURL(uploadTask.snapshot.ref)
               
              setstatus(StatusText.SAVING)

              await setDoc(doc(db,"users",user.id,"files",id),{
                name:file.name,
                size:file.size,
                type:file.type,
                downloadUrl:downloadURL,
                created_at:new Date(),
                ref:uploadTask.snapshot.ref.fullPath
              })
              setstatus(StatusText.GENERATING)

              setfileId(id)

            }

          );
    }

    return {progress,status,fileId,handleUpload}
}

export default useUpload