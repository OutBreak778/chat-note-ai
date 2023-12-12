import NoteLayout from "@/components/NoteLayout";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    throw Error("UserId Undefined");
  }

  const AllNotes = await prisma.note.findMany({ where: { userId } });

  return (
      <div className="h-full p-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
        {
          AllNotes.map((note) => (
            <NoteLayout note={note} key={note.id} />
          ))
        }
        </div>
        {
          AllNotes.length === 0 && (
            <div className="col-span-full text-center">
              You don't have any notes currently. why not create one ?
            </div>
          )
        }
      </div>
  );
};

export default page;
