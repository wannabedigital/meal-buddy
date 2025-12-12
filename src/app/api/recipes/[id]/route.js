// app/api/recipes/[id]/route.js
import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: 'id не указан' }, { status: 400 });
    }

    const q = `
      SELECT recipe_id, title, description, cooking_time, difficulty, author_username, published_at
      FROM published_recipes_view
      WHERE recipe_id = $1
      LIMIT 1;
    `;
    const result = await pool.query(q, [id]);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: 'Рецепт не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json({ recipe: result.rows[0] }, { status: 200 });
  } catch (err) {
    console.error(`GET /api/recipes/${params.id} error:`, err);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
