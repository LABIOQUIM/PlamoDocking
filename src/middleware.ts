// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  console.log(`Request URL: ${req.nextUrl.href}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);

  return NextResponse.next();
}
