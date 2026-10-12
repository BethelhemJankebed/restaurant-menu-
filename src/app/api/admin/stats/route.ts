import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { FALLBACK_CATEGORIES, FALLBACK_MENU_ITEMS } from '@/lib/fallbackData';

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
    console.warn('Error fetching admin stats from db, returning fallback stats:', error?.message);
    return NextResponse.json({
      success: true,
      stats: {
        totalItems: FALLBACK_MENU_ITEMS.length,
        totalCategories: FALLBACK_CATEGORIES.length,
        availableItems: FALLBACK_MENU_ITEMS.filter((i) => i.available).length,
        unavailableItems: FALLBACK_MENU_ITEMS.filter((i) => !i.available).length,
        featuredItems: FALLBACK_MENU_ITEMS.filter((i) => i.featured).length,
      },
      recentItems: FALLBACK_MENU_ITEMS.slice(0, 5),
      categories: FALLBACK_CATEGORIES,
      isFallback: true,
    });
  }
}
