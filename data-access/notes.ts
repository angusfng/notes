import { createClient } from "@/supabase/server";

export async function getNotes() {
  const supabase = createClient();
  return supabase.from("notes").select("*");
}

export async function getNote(id: number): Promise<any> {
  const supabase = createClient();
  return supabase.from("notes").select().eq("id", id);
}

export async function insertNote(title: string, description: string) {
  const supabase = createClient();
  return supabase.from("notes").insert({
    title: title,
    description: description,
  });
}

export async function deleteNote(id: number) {
  const supabase = createClient();
  return supabase.from("notes").delete().eq("id", id);
}
