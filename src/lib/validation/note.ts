import { z } from "zod"

const CreateNoteSchema = z.object({
    title: z.string().min(1,{message: "Title is Required"}),
    content: z.string().optional(),

})

export default CreateNoteSchema

export type NoteSchema = z.infer<typeof CreateNoteSchema>

export const UpdateNoteSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1,{message: "Title is Required"}).optional(),
    content: z.string().optional(),
})

export const DeleteNoteSchema = z.object({
    id: z.string().min(1)
})
