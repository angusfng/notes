import { getNoteAction } from "@/app/actions";
import EditNoteForm from "@/components/edit-note-form";

const EditNotePage = async ({ params }: { params: { id: number } }) => {
  const note = await getNoteAction(params.id);

  return (
    <div>
      <EditNoteForm
        id={note.id}
        title={note.title}
        description={note.description}
      />
    </div>
  );
};

export default EditNotePage;
