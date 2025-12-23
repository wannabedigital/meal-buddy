export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const url = new URL(request.url);
    const userIdParam = url.searchParams.get('user_id');
    const user_id =
      !isNaN(userIdParam) && userIdParam !== '' ? Number(userIdParam) : null;

    if (!id) {
      return NextResponse.json({ message: 'id не найден' }, { status: 400 });
    }

    const recipeInfoQuery = `
      SELECT
        p.recipe_id,
        p.title,
        p.description,
        p.cooking_time,
        p.difficulty,
        p.author_username,
        p.published_at,

        n.total_weight,
        n.total_calories,
        n.total_proteins,
        n.total_fats,
        n.total_carbs,

        COALESCE(
          json_agg(DISTINCT jsonb_build_object(
            'id', c.id,
            'name', c.name
          )) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categories,

        COALESCE(
          json_agg(DISTINCT jsonb_build_object(
            'id', t.id,
            'name', t.name
          )) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS tags,

        CASE
          WHEN $2::int IS NULL THEN NULL
          ELSE EXISTS (
            SELECT 1
            FROM favorites f
            WHERE f.user_id = $2
              AND f.recipe_id = p.recipe_id
          )
        END AS favorited

      FROM published_recipes_view p

      LEFT JOIN recipe_nutrition_view n
        ON n.recipe_id = p.recipe_id

      LEFT JOIN recipe_categories rc
        ON rc.recipe_id = p.recipe_id
      LEFT JOIN categories c
        ON c.id = rc.category_id

      LEFT JOIN recipe_tags rt
        ON rt.recipe_id = p.recipe_id
      LEFT JOIN tags t
        ON t.id = rt.tag_id

      WHERE p.recipe_id = $1

      GROUP BY
        p.recipe_id,
        p.title,
        p.description,
        p.cooking_time,
        p.difficulty,
        p.author_username,
        p.published_at,
        n.total_weight,
        n.total_calories,
        n.total_proteins,
        n.total_fats,
        n.total_carbs

      LIMIT 1;

    `;
    const result = await pool.query(recipeInfoQuery, [id, user_id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: 'Рецепт не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({ recipe: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error(`GET /api/recipes/${params.id} error:`, error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
