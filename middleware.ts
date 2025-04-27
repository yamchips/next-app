import { NextRequest, NextResponse } from "next/server";
import middleware from "next-auth/middleware";

// following function is for demonstration of how to use middleware: when visiting /users/1, redirect to /new-page
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/new-page", request.url));
// }
// default middleware redirect user to log in page
// we can use a shorter syntax:
// export {default} from "next-auth/middleware";
export default middleware;

export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  matcher: ["/admin/:path*"],
};
