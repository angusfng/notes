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
    errors: undefined,
    fieldValues: {
      title: title,
      description: description,
    },
  };

  const [formState, formAction] = useFormState(editNoteAction, initialState);

  return (
    <div>
      <form action={formAction}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          defaultValue={formState.fieldValues.title}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={formState.fieldValues.description}
        />
        <input type="hidden" name="id" value={id} />
        <SaveButton />
      </form>
    </div>
  );
};

export default EditNoteForm;
