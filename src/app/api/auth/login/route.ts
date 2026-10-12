import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = null;

    try {
      user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr: any) {
      console.warn('Prisma lookup failed, falling back to emergency credentials:', dbErr?.message);
    }

    if (!user) {
      // Allow default admin sign in if database is offline or unseeded on production host
      if (cleanEmail === 'admin@restaurant.com' && password === 'admin123') {
        const token = signToken({
          userId: 'admin-fallback-id',
          email: 'admin@restaurant.com',
          name: 'Chef Michel & Admin',
          role: 'ADMIN',
        });

        const response = NextResponse.json({
          success: true,
          user: {
            id: 'admin-fallback-id',
            name: 'Chef Michel & Admin',
            email: 'admin@restaurant.com',
            role: 'ADMIN',
          },
        });

        setAuthCookie(response, token);
        return response;
      }

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    setAuthCookie(response, token);
    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
