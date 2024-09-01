import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const user = request.cookies.get('eventez.token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login'

  if(!user) {
    if(isLoginPage) {
        return NextResponse.next();
    }
      return NextResponse.redirect(new URL ('/login', request.url))
  }
  if(isLoginPage) {
    return NextResponse.redirect(new URL('/user/home', request.url))
  }


}
export const config = {
  matcher: ['/login/', '/user/:path*'],
}