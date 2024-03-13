"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createNoteAction } from "@/app/actions";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const initialState = {
  message: "",
  errors: undefined,
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

  useEffect(() => {
    formRef.current?.reset();
  }, [formState]);

  return (
    <form className="flex flex-col gap-4" ref={formRef} action={formAction}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        defaultValue={formState.fieldValues.title}
        placeholder="Title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={formState.fieldValues.description}
        placeholder="Description"
      />
      <p aria-live="polite" className="sr-only">
        {formState.message}
      </p>
      <SubmitButton />
    </form>
  );
};

export default NoteForm;
