import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 10);
    const offset = Number(url.searchParams.get('offset') ?? 0);
    const userIdParam = url.searchParams.get('user_id');
    const user_id =
      !isNaN(userIdParam) && userIdParam !== '' ? Number(userIdParam) : null;

    const recipesQuery = `
      SELECT
				p.recipe_id,
				p.title,
				true AS favorited
			FROM favorites f
			JOIN published_recipes_view p
				ON p.recipe_id = f.recipe_id
			WHERE f.user_id = $3
			ORDER BY f.added_at DESC
			LIMIT $1 OFFSET $2;
    `;

    const result = await pool.query(recipesQuery, [limit, offset, user_id]);
    const recipes = result.rows;

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error('GET /api/profile/favorites error:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
