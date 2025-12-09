import { pool } from '@/lib/database';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return Response.json(
        { message: 'Ошибка получения данных' },
        { status: 400 }
      );
    }

    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const userExist = checkUser.rows[0];

    if (userExist) {
      return Response.json(
        { message: 'По такому email уже есть пользователь' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role;',
      [username, email, passwordHash, 'user']
    );

    const user = result.rows[0];

    return Response.json(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { message: 'Регистрация прошла успешно' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json({ message: 'Ошибка' }, { status: 500 });
  }
}
