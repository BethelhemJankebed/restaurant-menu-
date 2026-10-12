import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { FALLBACK_CATEGORIES } from '@/lib/fallbackData';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type'); // "FOOD" or "DRINK"

  try {
    const where: any = {};
    if (type) {
      where.type = type.toUpperCase();
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { menuItems: true },
        },
      },
    });

    if (categories && categories.length > 0) {
      return NextResponse.json({ success: true, categories });
    }

    // If database returned empty, serve high-quality fallback categories
    let fallback = FALLBACK_CATEGORIES;
    if (type) {
      fallback = fallback.filter((c) => c.type === type.toUpperCase());
    }
    return NextResponse.json({ success: true, categories: fallback });
  } catch (error: any) {
    console.warn('Database query failed for categories, serving fallback data:', error?.message);
    let fallback = FALLBACK_CATEGORIES;
    if (type) {
      fallback = fallback.filter((c) => c.type === type.toUpperCase());
    }
    return NextResponse.json({ success: true, categories: fallback, isFallback: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, type = 'FOOD', order } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();

    // Check duplicate
    const existing = await prisma.category.findUnique({
      where: { name: trimmedName },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'A category with this name already exists' },
        { status: 409 }
      );
    }

    // Determine order if not specified
    let categoryOrder = order;
    if (categoryOrder === undefined || categoryOrder === null) {
      const maxOrderCat = await prisma.category.findFirst({
        orderBy: { order: 'desc' },
      });
      categoryOrder = maxOrderCat ? maxOrderCat.order + 1 : 1;
    }

    const category = await prisma.category.create({
      data: {
        name: trimmedName,
        type: type === 'DRINK' ? 'DRINK' : 'FOOD',
        order: Number(categoryOrder),
      },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
