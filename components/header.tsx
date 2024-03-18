import Link from "next/link";
import NoteForm from "./note-form";

const Header = () => {
  return (
    <div className="container py-4 flex justify-between items-center">
      <Link className="text-xl" href="/">
        Notes
      </Link>
      <NoteForm />
    </div>
  );
};

export default Header;
