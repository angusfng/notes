import Link from "next/link";

const Header = () => {
  return (
    <div className="container mx-auto py-4">
      <Link className="text-xl" href="/">
        Notes
      </Link>
    </div>
  );
};

export default Header;
