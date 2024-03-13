import NoteCard from "@/components/note-card";
import NoteForm from "@/components/note-form";
import { getNotesAction } from "./actions";

export default async function Page() {
  const { data: notes } = await getNotesAction();

  return (
    <main className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex flex-col items-center">
        <div className="bg-slate-300 p-5">
          <NoteForm />
        </div>
        <ul className="flex gap-4">
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
      </div>
    </main>
  );
}
