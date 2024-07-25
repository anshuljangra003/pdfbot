import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 bg-gradient-to-bl from-white to-sky-400 overflow-y-scroll p-2 lg:p-5">
     <div className="bg-white py-26 sm:py-32 rounded-md drop-shadow-lg">
      <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-base text-pink-600">Your PDF Companion</h2>
          <p className="mt-2 text-3xl lg:text-6xl font-bold tracking-tight">
            Transform Your PDFs into interesting conversations

          </p>
        </div>
        <Button asChild className="mt-10">
          <Link href="/dashboard">Get Started</Link>
        </Button>

      </div>

     </div>
    </main>
  );
}
