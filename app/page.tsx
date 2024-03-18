import NoteCard from "@/components/note-card";
import { getNotesAction } from "./actions";

export default async function Page() {
  const notes = await getNotesAction();

  return (
    <main className="flex flex-col min-h-screen bg-slate-100">
      <div className="container py-4 grid md:grid-cols-4 grid-cols-2 gap-4">
        {notes?.map((note) => (
          <div key={note.id}>
            <NoteCard
              id={note.id}
              title={note.title}
              description={note.description}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
