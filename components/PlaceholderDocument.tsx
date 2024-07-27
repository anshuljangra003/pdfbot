"use client"
import { PlusCircleIcon } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


function PlaceholderDocument() {
    const router=useRouter();
    const handler=()=>{
        router.push("/dashboard/upload")
    }
  return (
    <Button onClick={()=>{
        handler();
    }} className="flex flex-col items-center w-64 h-80 rounded-md bg-slate-400 drop-shadow-sm text-gray-600 ">
        <PlusCircleIcon className="h-16 w-16"/>
        <p>Add Document</p>
    </Button>
  )
}

export default PlaceholderDocument