import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const secret = new TextEncoder().encode(JWT_SECRET);

const protectedFrontendRoutes = [
  "/dashboard",
  "/courses",
  "/courses/[id]",
  "/subscription",
];
const protectedApiRoutes = [
  "/api/courses",
  "/api/courses/[id]",
  "/api/progress/course",
  "/api/subscription/upgrade",
  "/api/user/profile",
];
const authRoutes = ["/auth/login", "/auth/signup", "/auth/logout"];

async function verifyTokenMiddleware(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  let token = null;
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    const cookieToken = request.cookies.get("auth-token");
    token = cookieToken?.value || null;
    const isProtectedFrontend = protectedFrontendRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isProtectedApi = protectedApiRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.includes(pathname);

    if (isProtectedApi) {
      if (!token) {
        return NextResponse.json(
          { error: "Unauthorized - No token provided" },
          { status: 401 }
        );
      }

      const decoded = await verifyTokenMiddleware(token);
      if (!decoded) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid token" },
          { status: 401 }
        );
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decoded.userId);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    if (isProtectedFrontend) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      const decoded = await verifyTokenMiddleware(token);
      if (!decoded) {
        const response = NextResponse.redirect(
          new URL("/auth/login", request.url)
        );
        response.cookies.delete("auth-token");
        return response;
      }

      return NextResponse.next();
    }

    if (isAuthRoute && token) {
      const decoded = await verifyTokenMiddleware(token);
      if (decoded) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
