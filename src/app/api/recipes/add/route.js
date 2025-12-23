import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function POST(request) {
  const {
    userId,
    title,
    description,
    cooking_time,
    difficulty,
    categories,
    tags,
    ingredients,
    steps,
  } = await request.json();

  if (!title || !description || !steps?.length) {
    return NextResponse.json(
      { message: 'Некорректные данные' },
      { status: 400 }
    );
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const recipeRes = await client.query(
      `
      INSERT INTO recipes
        (author_id, title, description, cooking_time, difficulty, status)
      VALUES
        ($1, $2, $3, $4, $5, 'draft')
      RETURNING id
      `,
      [userId, title, description, cooking_time, difficulty]
    );

    const recipeId = recipeRes.rows[0].id;

    for (const categoryId of categories ?? []) {
      await client.query(
        'INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)',
        [recipeId, categoryId]
      );
    }

    for (const tagId of tags ?? []) {
      await client.query(
        'INSERT INTO recipe_tags (recipe_id, tag_id) VALUES ($1, $2)',
        [recipeId, tagId]
      );
    }

    for (const ing of ingredients ?? []) {
      await client.query(
        `
        INSERT INTO recipe_ingredients
          (recipe_id, ingredient_id, amount, unit)
        VALUES ($1, $2, $3, $4)
        `,
        [recipeId, ing.ingredient_id, ing.amount, ing.unit]
      );
    }

    for (let i = 0; i < steps.length; i++) {
      await client.query(
        `
        INSERT INTO recipe_steps
          (recipe_id, step_number, description)
        VALUES ($1, $2, $3)
        `,
        [recipeId, i + 1, steps[i]]
      );
    }
    await client.query('COMMIT');

    return NextResponse.json({ success: true, recipeId });
  } catch (error) {
    await client.query('ROLLBACK');

    console.log('POST /api/recipes/add error:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  } finally {
    client.release();
  }
}
