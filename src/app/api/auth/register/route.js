import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { pool } from '@/lib/database';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Ошибка получения данных' },
        { status: 400 }
      );
    }

    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const userExist = checkUser.rows[0];

    if (userExist) {
      return NextResponse.json(
        { message: 'По такому email уже есть пользователь' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usersInsert = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role;',
      [username, email, passwordHash, 'user']
    );

    const user = usersInsert.rows[0];

    const profilesInsert = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1;',
      [user.id]
    );

    const profile = profilesInsert.rows[0];

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
