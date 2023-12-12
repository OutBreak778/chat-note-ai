import prisma from "@/lib/prisma";
import CreateNoteSchema, {
  DeleteNoteSchema,
  UpdateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { getEmbeddings } from "@/lib/openai";
import { noteIndex } from "@/lib/pinecone";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const ParseResult = CreateNoteSchema.safeParse(body);

    if (!ParseResult.success) {
      console.log(ParseResult.error);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = ParseResult.data;
    const { userId } = auth();

    if (!userId) {
      console.log("Unauthorized");
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    const embedding = await getEmbeddingsNote(title, content);

    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          content,
          userId,
        },
      });

      await noteIndex.upsert([
        {
          id: note.id,
          values: embedding,
          metadata: { userId },
        },
      ]);

      return note;
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.log("Error in /api/notes/route.ts", error);
    return new NextResponse("Internal Error from API", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const ParseResult = DeleteNoteSchema.safeParse(body);

    if (!ParseResult.success) {
      console.log(ParseResult.error);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = ParseResult.data;
    // const {id, title, content} = body
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

    await prisma.$transaction(async (tx) => {
      await tx.note.delete({where: {id }});
      await noteIndex.deleteOne(id)
    });

    return NextResponse.json({ error: "Note Deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error in /api/notes/route.ts", error);
    return new NextResponse("Internal Error from PATCH API", { status: 500 });
  }
}

async function getEmbeddingsNote(title: string, content: string | undefined) {
  return getEmbeddings(title + "\n\n" + content ?? "");
}
