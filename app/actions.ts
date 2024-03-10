"use server";

import { supabase } from "@/supabase/server";
import { revalidatePath } from "next/cache";

export async function createNote(prevState: any, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");

  try {
    const { error } = await supabase.from("notes").insert({
      title: title,
      description: description,
    });

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

export async function deleteNote(id: number) {
  try {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) {
      throw error;
    }
    revalidatePath("/");
  } catch (e) {
    console.error(e);
  }
}
