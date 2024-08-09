
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('currentUser')?.value
 
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url))
//   }
// }

export default async function middleware(request: NextRequest) {
    const protectedRoutes = ['/overview'];
    const currentPath = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath);

    if (isProtectedRoute) {
      const currentUser = request.cookies.get('currentUser')?.value;

      if (!currentUser) {
        return Response.redirect(new URL('/login', request.url));
      }
      return Response.redirect(new URL('/overview', request.url));
    }

  }
      
  
  
    
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}