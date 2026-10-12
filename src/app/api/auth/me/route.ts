import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const tokenUser = getUserFromRequest(req);
  if (!tokenUser) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: tokenUser.userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      return NextResponse.json({ authenticated: true, user });
    }
  } catch (err: any) {
    console.warn('Prisma auth/me lookup failed, falling back to token claims:', err?.message);
  }

  // Fallback to verified JWT token claims
  return NextResponse.json({
    authenticated: true,
    user: {
      id: tokenUser.userId,
      name: tokenUser.name,
      email: tokenUser.email,
      role: tokenUser.role,
    },
  });
}
