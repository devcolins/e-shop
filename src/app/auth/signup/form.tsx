'use client';
import { Button } from "@/components/ui/button";
import {  signup } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export function SignUpForm(){
    const [state, action] = useFormState(signup, undefined);

    return(
        <form action={action}>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <SignupButton />
        </form>
    );
}

export function SignupButton() {
    const { pending } = useFormStatus();
  
    return (
      <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
        {pending ? 'Submitting...' : 'Login'}
      </Button>
    );
  }