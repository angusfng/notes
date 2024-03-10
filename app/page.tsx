import NoteCard from "@/components/note-card";
import NoteForm from "@/components/note-form";
import { supabase } from "@/supabase/server";

export default async function Home() {
  const { data: notes } = await supabase.from("notes").select("*");

  return (
    <main>
      <h1>Notes</h1>
      <div className="bg-slate-300 p-5">
        <NoteForm />
      </div>
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              description={note.description}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
