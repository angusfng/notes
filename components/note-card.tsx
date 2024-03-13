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
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={async () => {
            await deleteNoteAction(id);
          }}
        >
          Delete
        </Button>
        <Link href={`/note/${id}`}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
