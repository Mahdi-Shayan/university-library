'use client'

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

function SignIn() {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={() => {}}
    />
  );
}

export default SignIn;
