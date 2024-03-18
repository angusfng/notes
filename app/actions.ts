"use server";

import {
  insertNote,
  deleteNote,
  getNotes,
  getNote,
  editNote,
} from "@/data-access/notes";
import { revalidatePath } from "next/cache";
import { Note } from "./types";
import { redirect } from "next/navigation";

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
      errors: undefined,
      fieldValues: {
        title: prevState.fieldValues.title,
        description: prevState.fieldValues.description,
      },
    };
  }
}

export async function editNoteAction(prevState: any, formData: FormData) {
  const id = formData.get("id") as unknown as number;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    const { data: note, error } = await editNote(id, title, description);
    if (error) {
      throw error;
    }
  } catch (e) {
    return {
      message: "error",
      errors: undefined,
      fieldValues: {
        title: prevState.fieldValues.title,
        description: prevState.fieldValues.description,
      },
    };
  }
  revalidatePath(`/note/${id}`);
  redirect(`/note/${id}`);
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

export async function getNoteAction(id: number): Promise<Note> {
  const { data: note, error } = await getNote(id);

  if (error) {
    console.error(error);
  }

  if (!note) {
    throw new Error("Note not found");
  }

  return note[0];
}
