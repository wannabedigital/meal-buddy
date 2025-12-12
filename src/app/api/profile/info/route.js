import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function POST(request) {
  try {
    const { id, fullname, bio } = await request.json();

    if (!id || !fullname || !bio) {
      return NextResponse.json(
        { message: 'Ошибка получения данных' },
        {
          status: 400,
        }
      );
    }

    const checkUser = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);

    const user = checkUser.rows[0];

    const checkProfile = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [id]
    );

    const profileExist = checkProfile.rows[0];

    if (!user || !profileExist) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 400 }
      );
    }

    const profilesUpdate = await pool.query(
      'UPDATE profiles SET full_name = $1, bio = $2 WHERE user_id = $3 RETURNING user_id, full_name, avatar_url, bio;',
      [fullname, bio, id]
    );

    const profile = profilesUpdate.rows[0];

    return NextResponse.json(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullname: profile.full_name,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/profile/info error:', error);

    return NextResponse.json({ message: 'Ошибка' }, { status: 500 });
  }
}
