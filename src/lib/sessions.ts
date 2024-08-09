//sessions
import 'server-only';
import { decrypt } from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT,  jwtVerify } from "jose";

const key =  new TextEncoder().encode(process.env.COOKIE_SECRET)

const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
    },
    duration: 1000 * 60 * 60 * 24 ,
    }

export async function encrypt(payload){
    return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}


export async function createSession(user_id: number): Promise<string> {
    const expires = new Date(Date.now() + cookie.duration); 
    const session = await encrypt({
      user_id,
      expires,
    }) 

    cookies.set(cookie.name, session, {...cookie.options, expires})
    redirect('/shop')
  }

  export async function verifySession(){
    const cookie = cookies().get(cookie.name)?.value
    const session = await decrypt(cookie)
    if(!session?.user_id){
      redirect('/login')
    }
    return  {
      user_id: session.user_id,
      expires: session.expires,
    }
  }

  export async function deleteSession(){
    cookies().delete(cookie.name)
    redirect('/login')
  }
