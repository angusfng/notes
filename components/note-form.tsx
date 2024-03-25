"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createNoteAction } from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { redirect } from "next/navigation";

const initialState = {
  message: "",
  error: null,
  fieldValues: {
    title: "",
    description: "",
  },
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? "Submitting..." : "Submit"}</Button>;
};

const NoteForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState(createNoteAction, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (formState.message === "success") {
      formRef.current?.reset();
      setOpen(false);
      redirect("/");
    }
  }, [formState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create note</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create note</DialogTitle>
        </DialogHeader>
        <div>
          <form
            className="flex flex-col gap-4"
            ref={formRef}
            action={formAction}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.fieldValues.title}
              placeholder="Title"
              className="h-10 p-2"
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={formState.fieldValues.description}
              placeholder="Description"
              className="h-32 p-2"
            />
            <p aria-live="polite" className="sr-only">
              {formState?.message}
            </p>
            <SubmitButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
