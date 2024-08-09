'use client'
 
import {  login } from '@/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
 
export default function Page() {
  const [errorMessage, dispatch] = useFormState(login, undefined)
 
  return (
    <form action={dispatch}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <LoginButton />
    </form>
  )
}
 
function LoginButton() {
  const { pending } = useFormStatus()
 
  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    if (pending) {
      event.preventDefault()
    }
  }
 
  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  )
}