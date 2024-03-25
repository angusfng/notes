import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { loginAction } from "@/app/actions";
import { AuthError } from "@supabase/supabase-js";

const initialState: {
  message: string;
  error: AuthError | null;
  fieldValues: {
    email: string;
    password: string;
  };
} = {
  message: "",
  error: null,
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
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
