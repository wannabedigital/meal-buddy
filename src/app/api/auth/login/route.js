import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/database';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json(
        { message: 'Ошибка получения данных' },
        { status: 400 }
      );

    const usersSelect = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = usersSelect.rows[0];

    const profilesSelect = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [user.id]
    );

    const profile = profilesSelect.rows[0];

    if (!user || !profile) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch)
      return NextResponse.json({ message: 'Неверный пароль' }, { status: 400 });

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
    console.log(error);

    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
