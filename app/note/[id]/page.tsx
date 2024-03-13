import { getNoteAction } from "@/app/actions";

const NotePage = async () => {
  const { data: note } = await getNoteAction(1);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <h2>{note[0].title}</h2>
      <p>{note[0].description}</p>
    </div>
  );
};

export default NotePage;
