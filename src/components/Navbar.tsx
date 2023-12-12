"use client"

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import ModeToggle from "./ThemeToggle";
import MobileSidebar from "./MobileSidebar";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes"
import AIChatButton from "./AiChatButton";


const Navbar = () => {

  const {theme} = useTheme()

  return (
    <div className="p-3 shadow bg-secondary text-primary">
      <div className="flex flex-wrap items-center justify-between max-w-7xl gap-4 m-auto">
        <MobileSidebar />
        <Link href={"/"}>
          <h1 className="text-xl md:text-2xl font-medium text-primary hidden md:block">
            OUTBREAK
          </h1>
        </Link>
        <div className="flex items-center gap-x-4">
          
          {/* <Button size="sm" variant="premium">Welcome Nikhil</Button> */}
          <AIChatButton />
          <ModeToggle />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              baseTheme: (theme === "dark" ? dark : undefined),
              elements: { avatarBox: { width: "2.1rem", height: "2.1rem" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
