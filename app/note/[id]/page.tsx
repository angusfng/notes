import { getNoteAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const NotePage = async ({ params }: { params: { id: number } }) => {
  const note = await getNoteAction(params.id);

  return (
    <div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/note/edit/${params.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <h2>{note?.title}</h2>
        <p>{note?.description}</p>
      </div>
    </div>
  );
};

export default NotePage;
