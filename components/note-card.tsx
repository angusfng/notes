"use client";

import { deleteNote } from "@/app/actions";
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
    <Link href={`/note/${id}`}>
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
              await deleteNote(id);
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NoteCard;
