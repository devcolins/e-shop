'use server'

import { FormState, SignInSchema, SignUpSchema } from './definations'
import { db } from '@/db/db'
import { usersTable } from '@/db/schema'
import { createSession } from './sessions'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'


 

// export async function authenticate(_currentState: unknown, formData: FormData) {
//   try {
//     await signIn('credentials', formData)
//   } catch (error) {
//     if (error) {
//       switch (error) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.'
//         default:
//           return 'Something went wrong.'
//       }
//     }
//     throw error
//   }
// }

export async function signup(state: FormState , FormData: FormData): Promise<FormState> {
    const validateResult = SignUpSchema.safeParse({
        name: FormData.get('name'),
        email: FormData.get('email'),
        password: FormData.get('password'),
        role: FormData.get('role'),
    })

    if (!validateResult.success) {
        return {
            errors: validateResult.error.flatten().fieldErrors,
            message: 'Invalid input.'
        }
    }

    const { name, email, password, role } = validateResult.data

    // const hashedPassword = await bcrypt.hash(password, 10)

    const data = await db.insert(usersTable).values({
        name,
        email,
        password,
        role
    }).returning({id: usersTable.id})

    const user = data[0]

    await createSession(user.id)

    redirect('/overview')
}

//login

export async function login(formData: FormData) {
    const validateResult = SignInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validateResult.success) {
        return {
            errors: validateResult.error.flatten().fieldErrors,
            message: 'Invalid input.'
        }
    }
    const { email, password } = validateResult.data

    const user = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (!user) {
        return {
            errors: {
                email: ['Invalid email or password.']
            },
            message: 'Invalid email or password.'
        }
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password)

    // if (!isPasswordValid) {
    //     return {
    //         errors: {
    //             password: ['Invalid email or password.']
    //         },
    //         message: 'Invalid email or password.'
    //     }
    // }

    await createSession(user.id)

    redirect('/shop')
}


