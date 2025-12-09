import { pool } from '@/lib/database';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return Response.json(
        { message: 'Ошибка получения данных' },
        { status: 400 }
      );

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const user = result.rows[0];

    console.log(user);

    if (!user) {
      return Response.json(
        { message: 'Пользователь не найден' },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch)
      return Response.json({ message: 'Неверный пароль' }, { status: 400 });

    return Response.json(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { message: 'Авторизация прошла успешно' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return Response.json({ message: 'Ошибка' }, { status: 500 });
  }
}
