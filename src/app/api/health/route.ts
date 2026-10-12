import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const startTime = Date.now();
    // Test database connection
    const categoryCount = await prisma.category.count();
    const duration = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: {
          status: 'connected',
          latencyMs: duration,
          categoryCount,
        },
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'production',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error?.message || 'Database unreachable',
      },
      { status: 503 }
    );
  }
}
