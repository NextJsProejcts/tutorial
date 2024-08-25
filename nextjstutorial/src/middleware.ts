import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const privateRoutes = ['/dashboard', '/users', '/users/user']
const publicRoutes = ['/landing', '/']

export default async function middleware(req: NextRequest) {
    const response = NextResponse.next();

    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isPrivateRoute = privateRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
   
    // 3. Decrypt the session from the cookie
    const cookie = 
    //get cookies by key(local storage)
    cookies().get('token')?.value
    // ''
    const session = 
    //decrypt result
    //await decrypt(cookie)
    {
        userId: 1,
    }
   
    // 5. Redirect to /login if the user is not authenticated
    if (isPrivateRoute && !session?.userId) {
      return NextResponse.redirect(new URL('/landing', req.nextUrl))
    }
   
    // 6. Redirect to /dashboard if the user is authenticated
    if (
      isPublicRoute &&
      session?.userId &&
      !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    // // redirect to /landing if the url is missing
    // if(!isPublicRoute && !isPrivateRoute){
    //   return NextResponse.redirect(new URL('/landing', req.nextUrl))
    // }
   
    return response;
  }
   
  