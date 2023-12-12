"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import TypewriterComponent from "typewriter-effect";

export default function Home() {
  const isSignedIn = useAuth();

  return (
    <div className="w-full">
      <div className="p-2 shadow">
        <nav className="flex items-center justify-between max-w-7xl m-auto ">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">OUTBREAK</h1>
          </Link>
          <div className="flex items-center gap-x-2">
            <Link href={isSignedIn ? "/notes" : "/sign-up"}>
              <Button variant="outline" className="rounded-full shadow-sm">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>
      <div className="text-primary font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>The Best AI Tool for</h1>
          <div className="text-transparent mb-4 py-3 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterComponent
              options={{
                strings: [
                  "Notes taking.",
                  "Storing Data.",
                  "Data Talking.",
                  "Concept Understanding.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-500">
          Chat with your{" "}
          <span className="underline underline-offset-4">Notes</span> using{" "}
          <b>AI</b>
        </div>
        <div>
          <Link href={isSignedIn ? "/notes" : "/sign-up"}>
            <Button
              variant="premium"
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Start Generating your Notes
            </Button>
          </Link>
        </div>
        <div className="w-1/2 mx-auto text-zinc-400 text-xs md:text-sm font-normal">
        An Intelligent note taking app with AI integration with OpenAI, NextJs, Clerk and many More.
      </div>
      </div>
    </div>
  );
}
