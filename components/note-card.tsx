"use client";

import { deleteNoteAction } from "@/app/actions";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface NoteCardProps {
  id: number;
  title: string;
  description: string;
}
const NoteCard = ({ id, title, description }: NoteCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="truncate">{description}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild>
          <Link href={`/note/${id}`}> View</Link>
        </Button>
        <Button
          onClick={async () => {
            await deleteNoteAction(id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
