import prisma from "@/lib/prisma";
import {
  UpdateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getEmbeddings } from "@/lib/openai";
import { noteIndex } from "@/lib/pinecone";

export async function PATCH(req: Request, {params}: {params: { noteId: string }}) {
    try {
      const body = await req.json();
      const ParseResult = UpdateNoteSchema.safeParse(body);
  
      if (!ParseResult.success) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
      }

      if(!params.noteId) {
        return new NextResponse("Note Id is Required", {status: 400})
      }
  
      // const {id, title, content} = ParseResult.data
      const { id, title, content } = ParseResult.data
      const { userId } = auth();
  
      const note = await prisma.note.findUnique({ where: { id } });
  
      if (!note) {
        return NextResponse.json({ error: "Note not Found" }, { status: 401 });
      }
  
      if (!userId || userId !== note.userId) {
        console.log("Unauthorized");
        return NextResponse.json(
          { error: "Unauthorized Access" },
          { status: 401 }
        );
      }

      const embedding = await getEmbeddingsNote(title, content)

      const UpdateNote = await prisma.$transaction(async (tx) => {
        const UpdateNote = await prisma.note.update({
            where: {
              id,
            },
            data: {
              title,
              content,
            },
          });

          await noteIndex.upsert([
            {
                id,
                values: embedding,
                metadata: {userId}
            }
          ])
          return UpdateNote
      })
  
      
  
      return NextResponse.json({ UpdateNote }, { status: 200 });
    } catch (error) {
      console.log("Error in /api/notes/route.ts", error);
      return new NextResponse("Internal Error from PATCH API", { status: 500 });
    }
  }

  async function getEmbeddingsNote(title: string | undefined, content: string | undefined) {
    return getEmbeddings(title + "\n\n" + content ?? "");
  }
  