import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export const middleware = (req: NextRequest) => {
  console.log("@start middleware");
  if (req.nextUrl.pathname === "/login") {
    console.log("@in login");
    const token = req.nextUrl.searchParams.get("token")!;
    const decoded = jwtDecode(token) as { UserGuid: string };
    console.log("@token", decoded);

    const response = NextResponse.redirect(new URL("/clients", req.url));
    response.cookies.set("token", token, {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set("guid", decoded.UserGuid, {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  }

  if (!req.cookies.get("token"))
    return NextResponse.redirect("http:localhost:1339/login");

  return NextResponse.next();
};

export const config = {
  matcher: ["/:path*"],
};
