import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { FALLBACK_MENU_ITEMS, filterFallbackItems } from '@/lib/fallbackData';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const type = searchParams.get('type');
  const search = searchParams.get('search')?.trim();
  const featured = searchParams.get('featured');
  const availableOnly = searchParams.get('availableOnly') === 'true';

  try {
    const where: any = {};

    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId;
    }

    if (type && type !== 'all') {
      where.category = {
        type: type.toUpperCase(),
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (availableOnly) {
      where.available = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { ingredients: { contains: search } },
        {
          category: {
            name: { contains: search },
          },
        },
      ];
    }

    const items = await prisma.menuItem.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [
        { category: { order: 'asc' } },
        { featured: 'desc' },
        { name: 'asc' },
      ],
    });

    if (items && items.length > 0) {
      return NextResponse.json({ success: true, count: items.length, items });
    }

    // Database is empty - serve fallback items
    const fallback = filterFallbackItems(FALLBACK_MENU_ITEMS, {
      categoryId,
      type,
      search,
      featured,
      availableOnly,
    });
    return NextResponse.json({ success: true, count: fallback.length, items: fallback });
  } catch (error: any) {
    console.warn('Database query failed for menu-items, serving fallback data:', error?.message);
    const fallback = filterFallbackItems(FALLBACK_MENU_ITEMS, {
      categoryId,
      type,
      search,
      featured,
      availableOnly,
    });
    return NextResponse.json({ success: true, count: fallback.length, items: fallback, isFallback: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      description,
      price,
      imageUrl,
      ingredients,
      available = true,
      featured = false,
      categoryId,
    } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { error: 'Selected category does not exist' },
        { status: 400 }
      );
    }

    const newItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        description: description?.trim() || '',
        price: parseFloat(price),
        imageUrl:
          imageUrl?.trim() ||
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        ingredients: ingredients?.trim() || '',
        available: Boolean(available),
        featured: Boolean(featured),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}
