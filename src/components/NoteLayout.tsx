"use client"

import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";
import { useState } from "react";
import AddDialog from "./AddDialog";
import { Circle } from "lucide-react";

interface NoteLayoutProps {
  note: NoteModel;
}

const NoteLayout = ({ note }: NoteLayoutProps) => {
  const [editDialog, setEditDialog] = useState(false);

  const updated = note.updatedAt > note.createdAt;

  const TimeStamp = (updated ? note.updatedAt : note.createdAt).toDateString();

  return (
    <>
    <Card className="bg-secondary/75 shadow-inner border border-solid border-primary transition-shadow hover:shadow-lg rounded-xl cursor-pointer hover:opacity-80"
        onClick={() => setEditDialog(true)}
    >
      <CardHeader className="flex justify-center text-start text-xs text-primary">
        <CardTitle className="text-lg">{note.title}</CardTitle>
        <CardDescription className="relative text-start flex flex-col justify-between">
          <span className="text-xs">{TimeStamp}</span>
          <span className="relative text-xs right-0"><b>{updated && "updated"}</b></span>
        </CardDescription>
        <Separator className="bg-primary/10" />
      </CardHeader>
      <CardContent className="flex justify-between text-muted-foreground">
        <p className="whitespace-pre-line line-clamp-3 text-md text-left">
          {note.content}
        </p>
      </CardContent>
    </Card>
    <AddDialog open={editDialog} setOpen={setEditDialog} noteToEdit={note} />
    </>
  );
};

export default NoteLayout;
