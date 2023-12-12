import openai, { getEmbeddings } from "@/lib/openai";
import { noteIndex } from "@/lib/pinecone";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesliced = messages.slice(-6);
    const embedding = await getEmbeddings(
      messagesliced
        .map((message) => {
          message.content;
        })
        .join("\n")
    );

    const {userId} = auth()
    const vectorResponse = await noteIndex.query({
        vector: embedding,
        topK: 12,
        filter: {userId}
    })

    const relevantNote = await prisma.note.findMany({
        where: {
            id: {
                in: vectorResponse.matches.map((match) => match.id)
            }
        }
    })
    // console.log(relevantNote)

    const systemMessage: ChatCompletionMessage = {
        role: "assistant",
        content: 
        "you are an intelligent note-taking app. you answer the question according to user existing note. " + 
        "The relevant note from the query are\n" + 
        relevantNote.map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`).join("\n\n")
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: [systemMessage, ...messagesliced],
    })
    
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)


  } catch (error) {
    console.log("Error in /api/chat/route.ts", error);
    return new NextResponse("Internal Error in /api/chat/route.ts", {
      status: 500,
    });
  }
}
