"use client";

import { editNoteAction } from "@/app/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface EditNoteFormProps {
  id: number;
  title: string;
  description: string;
}

const SaveButton = () => {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? "Saving..." : "Save"}</Button>;
};

const EditNoteForm = ({ id, title, description }: EditNoteFormProps) => {
  const initialState = {
    message: "",
    errors: null,
    fieldValues: {
      title: title,
      description: description,
    },
  };

  const [formState, formAction] = useFormState(editNoteAction, initialState);

  return (
    <div>
      <h1 className="text-4xl">Edit Form</h1>
      <form className="flex flex-col gap-8 mt-4" action={formAction}>
        <label className="text-2xl" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={formState.fieldValues.title}
          className="h-10 p-2"
        />
        <label className="text-2xl" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={formState.fieldValues.description}
          className="h-64 p-2"
        />
        <input type="hidden" name="id" value={id} />
        <SaveButton />
      </form>
    </div>
  );
};

export default EditNoteForm;
