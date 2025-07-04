import { NextResponse } from "next/server";

export function middleware(request){
    // the route will redirect it to studentlist page
    // return NextResponse.redirect(new URL("/studentlist",request.url))
}

export const config={
    // this will ignore this route for this path 
    // matcher:["/Contact/:path*"]
}