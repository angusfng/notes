"use client";

import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { loginAction } from "@/app/actions";

const initialState = {
  message: "",
  fieldValues: {
    email: "",
    password: "",
  },
};

const LoginForm = () => {
  const [formState, formAction] = useFormState(loginAction, initialState);

  return (
    <div>
      <form action={formAction}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={formState.fieldValues.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={formState.fieldValues.password}
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
