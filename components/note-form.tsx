"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createNote } from "@/app/actions";
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
  const [state, formAction] = useFormState(createNote, initialState);

  useEffect(() => {
    formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        defaultValue={state.fieldValues.title}
        placeholder="Title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        defaultValue={state.fieldValues.description}
        placeholder="Description"
      />
      <p aria-live="polite" className="sr-only">
        {state.message}
      </p>
      <SubmitButton />
    </form>
  );
};

export default NoteForm;
