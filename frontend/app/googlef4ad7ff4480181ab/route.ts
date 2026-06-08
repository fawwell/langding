import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: googlef4ad7ff4480181ab.html', {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
