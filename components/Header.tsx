import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { FilePlus2 } from 'lucide-react'

function Header() {
  return (
    
    <div className='flex justify-between shadow-sm p-5 border-b'>
        <Link href="/dashboard" className='text-2xl'>
        Chat with <span className='text-indigo-500'>PDF</span>
        </Link>
        <SignedIn>
            <div className='flex items-center space-x-2'>
            <Button asChild className='hidden md:flex' variant={'link'}>
            <Link href="/dashboard/upgrade">Pricing</Link>
            </Button>
            <Button asChild className='hidden md:flex' variant="outline">
            <Link href="/dashboard/upgrade">My Documents</Link>
            </Button>
            <Button asChild className='hidden md:flex' variant="outline">
            <Link href="/dashboard/upload">
            <FilePlus2 className='text-indigo-600'/>
            </Link>
            </Button>
                <UserButton/>
            </div>
        </SignedIn>
    </div>
  )
}

export default Header