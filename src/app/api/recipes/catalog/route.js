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
        r.recipe_id,
        r.title,
        CASE
          WHEN $3::int IS NULL THEN NULL
          ELSE EXISTS(
            SELECT 1
            FROM favorites f
            WHERE f.user_id = $3::int
              AND f.recipe_id = r.recipe_id
            LIMIT 1
          )
        END AS favorited
      FROM published_recipes_view r
      ORDER BY r.published_at DESC
      LIMIT $1
      OFFSET $2;
    `;

    const result = await pool.query(recipesQuery, [limit, offset, user_id]);
    const recipes = result.rows;

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    console.error('GET /api/recipes/catalog error:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
