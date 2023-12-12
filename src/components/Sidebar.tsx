"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, ScrollText, User } from "lucide-react";
import React, { useState } from "react";
import AddDialog from "./AddDialog";
import { Button } from '@/components/ui/button';
import { redirect } from "next/navigation";

const routes = [
  {
    id: 1,
    icon: Home,
    button: () => redirect("/"),
    label: "Home",
  },
  {
    id: 2,
    icon: ScrollText,
    button: () => redirect("/notes"),
    label: "Notes",
  },
  {
    id: 3,
    icon: Plus,
    button: () => true,
    label: "Add Notes",
  },
  {
    id: 4,
    icon: User,
    button: () => redirect("/profile"),
    label: "Profile",
  },
];

const Sidebar = () => {

    const [showModel, setShowModel] = useState(false)

  return (
    <>
    <div className="shadow-xl flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex-1 justify-center">
        <div className="space-y-8 mt-4">
          {routes.map((route) => (
            <div
            onClick={() => setShowModel(route.button)}
              key={route.id}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {showModel && <AddDialog open={showModel} setOpen={setShowModel} />}
    </>
  );
};

export default Sidebar;
