import { NextResponse } from 'next/server';
import { pool } from '@/lib/database';

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? 10);
    const offset = Number(url.searchParams.get('offset') ?? 0);

    const userIdParam = url.searchParams.get('user_id');
    const user_id =
      !isNaN(userIdParam) && userIdParam !== '' ? Number(userIdParam) : null;

    const categoriesParam = url.searchParams.get('categories');
    const parsedCategories = categoriesParam
      ? categoriesParam.split(',').map(Number)
      : null;
    const categories =
      parsedCategories && parsedCategories.length ? parsedCategories : null;

    const tagsParam = url.searchParams.get('tags');
    const parsedTags = tagsParam ? tagsParam.split(',').map(Number) : null;
    const tags = parsedTags && parsedTags.length ? parsedTags : null;

    const ingredientsParam = url.searchParams.get('ingredients');
    const parsedIngredients = ingredientsParam
      ? ingredientsParam.split(',').map(Number)
      : null;
    const ingredients =
      parsedIngredients && parsedIngredients.length ? parsedIngredients : null;

    const totalQuery = `
      SELECT COUNT(*)
      FROM published_recipes_view r
      WHERE
        (
          $1::int[] IS NULL
          OR (
            SELECT COUNT(DISTINCT rc.category_id)
            FROM recipe_categories rc
            WHERE rc.recipe_id = r.recipe_id
              AND rc.category_id = ANY($1)
          ) = array_length($1, 1)
        )
      AND
        (
          $2::int[] IS NULL
          OR (
            SELECT COUNT(DISTINCT rt.tag_id)
            FROM recipe_tags rt
            WHERE rt.recipe_id = r.recipe_id
              AND rt.tag_id = ANY($2)
          ) = array_length($2, 1)
        )
      AND
        (
          $3::int[] IS NULL
          OR (
            SELECT COUNT(DISTINCT ri.ingredient_id)
            FROM recipe_ingredients ri
            WHERE ri.recipe_id = r.recipe_id
              AND ri.ingredient_id = ANY($3)
          ) = array_length($3, 1)
        )
    `;

    const totalRecipesResult = await pool.query(totalQuery, [
      categories,
      tags,
      ingredients,
    ]);

    const totalRecipes = totalRecipesResult.rows[0].count;

    if (totalRecipes === 0)
      return NextResponse.json(
        { totalRecipes: 0, recipes: [] },
        { status: 200 }
      );

    const recipesQuery = `
      SELECT
        r.recipe_id,
        r.title,

        CASE
          WHEN $3::int IS NULL THEN NULL
          ELSE EXISTS (
            SELECT 1
            FROM favorites f
            WHERE f.user_id = $3
              AND f.recipe_id = r.recipe_id
          )
        END AS favorited

      FROM published_recipes_view r

      WHERE
        (
          $4::int[] IS NULL
          OR (
            SELECT COUNT(DISTINCT rc.category_id)
            FROM recipe_categories rc
            WHERE rc.recipe_id = r.recipe_id
              AND rc.category_id = ANY($4)
          ) = array_length($4, 1)
        )
      AND
        (
          $5::int[] IS NULL
          OR (
            SELECT COUNT(DISTINCT rt.tag_id)
            FROM recipe_tags rt
            WHERE rt.recipe_id = r.recipe_id
              AND rt.tag_id = ANY($5)
          ) = array_length($5, 1)
        )
      AND
        (
          $6::int[] IS NULL
          OR (
            SELECT COUNT(DISTINCT ri.ingredient_id)
            FROM recipe_ingredients ri
            WHERE ri.recipe_id = r.recipe_id
              AND ri.ingredient_id = ANY($6)
          ) = array_length($6, 1)
        )

      ORDER BY r.published_at DESC
      LIMIT $1 OFFSET $2;
    `;

    const result = await pool.query(recipesQuery, [
      limit,
      offset,
      user_id,
      categories,
      tags,
      ingredients,
    ]);
    const recipes = result.rows;

    return NextResponse.json(
      { totalRecipes: totalRecipes, recipes: recipes },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/recipes/catalog error:', error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
