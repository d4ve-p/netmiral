import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'auth_token';

const PUBLIC_PATHS = [
    "/auth",
]

export default function middleware(request: NextRequest) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const { pathname } = request.nextUrl;

    const isProtectedRoute = !PUBLIC_PATHS.some(path => pathname.startsWith(path));

    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/auth', request.url);
        loginUrl.searchParams.set('from', request.nextUrl.pathname);

        return NextResponse.redirect(loginUrl);
    }

    if (token && pathname.startsWith('/auth')) {
        // TODO: Change to dashboard URL
        const dashboardUrl = new URL('/', request.url);

        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}
