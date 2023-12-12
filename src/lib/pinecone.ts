import {Pinecone} from "@pinecone-database/pinecone"

const apikey = process.env.PINECONE_API_KEY

if (!apikey) {
    throw Error("Pinecone API key is not valid")
}

const pinecone = new Pinecone({
    environment: "gcp-starter",      
	apiKey: apikey
});      

export const noteIndex = pinecone.Index("companion");