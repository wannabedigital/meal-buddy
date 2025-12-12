import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: 'id не указан' }, { status: 400 });
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
        n.total_carbs
      FROM published_recipes_view p
      LEFT JOIN recipe_nutrition_view n USING (recipe_id)
      WHERE p.recipe_id = $1
      LIMIT 1;
    `;
    const result = await pool.query(recipeInfoQuery, [id]);

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
