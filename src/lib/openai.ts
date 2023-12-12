import OpenAI from "openai"

const apikey = process.env.OPENAI_API_KEY

// if (!apikey) {
//     throw Error("OPENAI API key is not Valid or set")
// }

const openai = new OpenAI({
  apiKey: apikey
});

export default openai

export async function getEmbeddings(text:string) {
    const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text
    })

    const embeddings = response.data[0].embedding

    if (!embeddings) {
        throw Error("Embeddings not generated")
    }
    // console.log(embeddings)
    return embeddings
}
