import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get('user_id');
    const user_id =
      !isNaN(userIdParam) && userIdParam !== '' ? Number(userIdParam) : null;

    const counterQuery =
      'SELECT COUNT(*) FROM recipes WHERE ($1::int IS NULL OR author_id = $1::int)';

    const result = await pool.query(counterQuery, [user_id]);

    const recipesAmount = result.rows[0].count;

    return NextResponse.json({ recipesAmount }, { status: 200 });
  } catch (error) {
    console.log('GET /api/profile/recipes-amount error:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
