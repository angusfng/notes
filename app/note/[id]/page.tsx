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
      <div className="flex justify-between">
        <Button asChild>
          <Link href="/">Back to dashboard</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/note/edit/${params.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col mt-8 gap-8">
        <h1 className="text-4xl">{note?.title}</h1>
        <p>{note?.description}</p>
      </div>
    </div>
  );
};

export default NotePage;
