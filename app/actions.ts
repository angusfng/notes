"use server";

import { insertNote, deleteNote, getNotes, getNote } from "@/data-access/notes";
import { revalidatePath } from "next/cache";
import { Note } from "./types";

export async function createNoteAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    const { error } = await insertNote(title, description);
    if (error) {
      throw error;
    }

    revalidatePath("/");
    return {
      message: "success",
      errors: undefined,
      fieldValues: {
        title: "",
        description: "",
      },
    };
  } catch (e) {
    return {
      message: "error",
      errors: undefined, // Should do something here
      fieldValues: {
        title: "",
        description: "",
      },
    };
  }
}

export async function deleteNoteAction(id: number) {
  await deleteNote(id);

  revalidatePath("/");
}

export async function getNotesAction(): Promise<Note[]> {
  const { data: notes, error } = await getNotes();

  if (error) {
    console.error(error);
  }

  if (!notes) {
    return [];
  }

  return notes;
}

export async function getNoteAction(id: number): Promise<Note | null> {
  const { data: note, error } = await getNote(id);

  if (error) {
    console.error(error);
  }

  if (!note) {
    return null;
  }

  return note[0];
}
