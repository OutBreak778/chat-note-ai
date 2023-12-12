import CreateNoteSchema, { NoteSchema } from "@/lib/validation/note";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ButtonLoading from "./ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface AddDialogProps {
  open: boolean;
  setOpen: (oepn: boolean) => void;
  noteToEdit?: Note;
}

const AddDialog = ({ open, setOpen, noteToEdit }: AddDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [deleteNote, setDeleteNote] = useState(false);

  const form = useForm<NoteSchema>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  async function onSubmit(input: NoteSchema) {
    try {
      if (noteToEdit) {
        const response = await fetch("/api/notes/[noteId]", {
          method: "PATCH",
          body: JSON.stringify({
            id: noteToEdit.id,
            ...input,
          }),
        });
        if (!response.ok) throw Error("Status code: " + response.status);
        // await axios.patch(`/api/notes/${noteToEdit.userId}`, input);
        toast({ description: "Successfully Updated", variant: "success" });
      } else {
        // const response = await fetch("/api/notes", {
        //   method: "PUT",
        //   body: JSON.stringify(input),
        // });
        // if (!response.ok) throw Error("Status code: " + response.status);
        await axios.put("/api/notes", input);
        toast({ description: "Successfully Added", variant: "primary" });
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went Wrong!",
      });
    }
  }

  async function DeleteNote() {
    if (!noteToEdit) {
      return;
    }
    setDeleteNote(true);

    try {
      const res = await fetch("/api/notes", {
        method: "DELETE",
        body: JSON.stringify({
          id: noteToEdit.id,
        }),
      });
      if (!res.ok) throw Error("Status code: " + res.status);
      toast({
        variant: "primary",
        description: "Deleted Successfully"
      })
      router.refresh();
      setOpen(false);
    } catch (error) {
      setDeleteNote(false);
      toast({
        variant: "destructive",
        description: "Something went wrong!"
      })
      console.log("error", error);
    } finally {
      setDeleteNote(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!noteToEdit ? "Add Note" : "Edit Note"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>TITLE</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Note..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CONTENT</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Enter your Note Content..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-x-4">
              {noteToEdit && (
                <ButtonLoading
                  className="mt-2 sm:mt-4"
                  type="button"
                  variant="destructive"
                  onClick={DeleteNote}
                  loading={deleteNote}
                  disabled={form.formState.isSubmitting}
                >
                  Delete
                </ButtonLoading>
              )}
              <ButtonLoading
                className="mt-2 sm:mt-4"
                type="submit"
                loading={form.formState.isSubmitting}
                disabled={deleteNote}
              >
                Submit
              </ButtonLoading>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
