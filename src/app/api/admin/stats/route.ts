import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalItems,
      totalCategories,
      availableItems,
      unavailableItems,
      featuredItems,
      recentItems,
      categories,
    ] = await Promise.all([
      prisma.menuItem.count(),
      prisma.category.count(),
      prisma.menuItem.count({ where: { available: true } }),
      prisma.menuItem.count({ where: { available: false } }),
      prisma.menuItem.count({ where: { featured: true } }),
      prisma.menuItem.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true },
      }),
      prisma.category.findMany({
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: { menuItems: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalItems,
        totalCategories,
        availableItems,
        unavailableItems,
        featuredItems,
      },
      recentItems,
      categories,
    });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
