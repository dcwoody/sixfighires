import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  // Placeholder logic; in real scenario, save email to database or service
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
  }
  return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 200 });
}
