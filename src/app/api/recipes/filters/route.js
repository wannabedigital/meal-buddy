import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET() {
  try {
    const categories = await pool.query(
      'SELECT id, name FROM categories ORDER BY name'
    );

    const tags = await pool.query('SELECT id, name FROM tags ORDER BY name');

    const ingredients = await pool.query(
      'SELECT id, name FROM ingredients ORDER BY name'
    );

    return NextResponse.json({
      categories: categories.rows,
      tags: tags.rows,
      ingredients: ingredients.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to load filters' },
      { status: 500 }
    );
  }
}
