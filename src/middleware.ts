import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const user = request.cookies.get('eventez.user.token')?.value;
  const partner = request.cookies.get('eventez.partner.token')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isUserPage = request.nextUrl.pathname.startsWith('/user')
  const isPartnerPage = request.nextUrl.pathname.startsWith('/partner')


  if(request.nextUrl.pathname === '/') return NextResponse.redirect(new URL ('/login', request.url))
  if(!user && !partner) {
    if(isLoginPage) {
        return NextResponse.next();
    }
      return NextResponse.redirect(new URL ('/login', request.url))
  }
  if(isLoginPage) {
    if(user){
      return NextResponse.redirect(new URL('/user/home', request.url))
    }else if(partner){
      return NextResponse.redirect(new URL('/partner/home', request.url))
    }
    
  }

  if(user && isPartnerPage){
    return NextResponse.redirect(new URL('/user/home', request.url))
  }
  if(partner && isUserPage){
    return NextResponse.redirect(new URL('/partner/home', request.url))
  }


}
export const config = {
  matcher: ['/login/', '/user/:path*', '/partner/:path*', '/'],
}