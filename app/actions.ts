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
import { createClient } from "@/supabase/server";

export async function createNoteAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const { error } = await insertNote(title, description);
  if (error) {
    return {
      message: "error",
      error: error,
      fieldValues: {
        title: prevState.fieldValues.title,
        description: prevState.fieldValues.description,
      },
    };
  }

  revalidatePath("/");
  return {
    message: "success",
    error: null,
    fieldValues: {
      title: "",
      description: "",
    },
  };
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
      errors: null,
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

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const data = {
    email,
    password,
  };
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return {
      message: "error",
      fieldValues: {
        email: prevState.fieldValues.email,
        password: prevState.fieldValues.password,
      },
    };
  }

  redirect("/");
}
