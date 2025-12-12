import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 10);
    const offset = Number(url.searchParams.get('offset') ?? 0);

    const recipesQuery = `
      SELECT recipe_id, title
      FROM published_recipes_view
      ORDER BY published_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await pool.query(recipesQuery, [limit, offset]);
    const recipes = result.rows;

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error('GET /api/recipes/catalog error:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
