import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: 'id не указан' }, { status: 400 });
    }

    const recipeInfoQuery = `
			SELECT * FROM recipe_steps WHERE recipe_id = $1;
		`;
    const result = await pool.query(recipeInfoQuery, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: 'Рецепт не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({ steps: result.rows }, { status: 200 });
  } catch (error) {
    console.error(`GET /api/recipes/steps/${params.id} error:`, error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
