//zod validation
import { z } from "zod"
// user zod schema

const SignUpSchema =  z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.string().default('customer'),
  });
  
const SignInSchema =  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    });

type FormState =
    | {
        errors?: {
          name?: string[];
          email?: string[];
          password?: string[];
        };
        message?: string;
      }
    | undefined;
  
type SessionPayload = {
    userId: string | number;
    expiresAt: Date;
  };
  
  export type { FormState, SessionPayload };
  
  export { SignUpSchema, SignInSchema };