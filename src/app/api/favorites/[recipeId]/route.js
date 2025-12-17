import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function POST(request, { params }) {
  try {
    const id = await request.json();

    if (!id)
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });

    const recipeId = await params;
    if (!recipeId)
      return NextResponse.json({ message: 'Неверный id' }, { status: 400 });

    const query = `
      INSERT INTO favorites (user_id, recipe_id, added_at)
      VALUES ($1, $2, now())
      ON CONFLICT (user_id, recipe_id) DO NOTHING
      RETURNING user_id, recipe_id, added_at
    `;
    const result = await pool.query(query, [id.id, recipeId.recipeId]);

    return NextResponse.json(
      { success: true, favorited: true, inserted: result.rowCount > 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error('POST /api/favorites/[id] error', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = await request.json();

    if (!id)
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });

    const recipeId = await params;
    if (!recipeId)
      return NextResponse.json({ message: 'Неверный id' }, { status: 400 });

    const query = 'DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2';
    await pool.query(query, [id.id, recipeId.recipeId]);

    return NextResponse.json(
      { success: true, favorited: false },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/favorites/[id] error', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
