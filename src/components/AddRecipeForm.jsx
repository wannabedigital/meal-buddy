'use client';
import { useState, useEffect } from 'react';

import styles from '@styles/addRecipeForm.module.css';
import { useAuthStore } from '@store/authStore';

const AddRecipeForm = () => {
  const userId = useAuthStore((state) => state.user?.id || '');

  const initialFormState = {
    title: '',
    description: '',
    cooking_time: '',
    difficulty: 1,
    categories: [],
    tags: [],
    ingredients: [{ ingredient_id: '', amount: '', unit: 'g' }],
    steps: [''],
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const res = await fetch('/api/recipes/filters');
      if (!res.ok) return;
      const data = await res.json();
      setCategories(data.categories);
      setTags(data.tags);
      setIngredients(data.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleArrayValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...form.ingredients];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredient = () => {
    setForm((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { ingredient_id: '', amount: '', unit: 'g' },
      ],
    }));
  };

  const removeIngredient = (index) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateStep = (index, value) => {
    const updated = [...form.steps];
    updated[index] = value;
    setForm((prev) => ({ ...prev, steps: updated }));
  };

  const addStep = () => {
    setForm((prev) => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (index) => {
    setForm((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/recipes/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        title: form.title,
        description: form.description,
        cooking_time: Number(form.cooking_time),
        difficulty: Number(form.difficulty),
        categories: form.categories,
        tags: form.tags,
        ingredients: form.ingredients,
        steps: form.steps,
      }),
    });

    if (!res.ok) {
      return;
    }

    setForm(initialFormState);
  };

  return (
    <form className={styles.recipeForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Добавить рецепт</h2>

      <label className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Название блюда</span>
        <input
          name='title'
          className={styles.inputField}
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Описание</span>
        <textarea
          name='description'
          className={styles.textareaField}
          value={form.description}
          onChange={handleChange}
          required
        />
      </label>

      <div className={styles.row}>
        <label className={styles.fieldContainer}>
          <span className={styles.fieldLabel}>Время (мин)</span>
          <input
            type='number'
            name='cooking_time'
            className={styles.inputField}
            value={form.cooking_time}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.fieldContainer}>
          <span className={styles.fieldLabel}>Сложность</span>
          <select
            name='difficulty'
            className={styles.selectField}
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value={1}>★☆☆☆☆</option>
            <option value={2}>★★☆☆☆</option>
            <option value={3}>★★★☆☆</option>
            <option value={4}>★★★★☆</option>
            <option value={5}>★★★★★</option>
          </select>
        </label>
      </div>

      <div className={styles.block}>
        <span className={styles.blockTitle}>Категории</span>
        <div className={styles.checkboxGrid}>
          {categories.map((c) => (
            <label key={c.id} className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type='checkbox'
                checked={form.categories.includes(c.id)}
                onChange={() => toggleArrayValue('categories', c.id)}
              />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkboxSpan}>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <span className={styles.blockTitle}>Теги</span>
        <div className={styles.checkboxGrid}>
          {tags.map((t) => (
            <label key={t.id} className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type='checkbox'
                checked={form.tags.includes(t.id)}
                onChange={() => toggleArrayValue('tags', t.id)}
              />
              <span className={styles.customCheckbox}></span>
              <span className={styles.checkboxSpan}>{t.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <span className={styles.blockTitle}>Ингредиенты</span>

        {form.ingredients.map((ing, i) => (
          <div key={i} className={styles.ingredientRow}>
            <select
              className={`${styles.selectField} ${styles.miniField}`}
              value={ing.ingredient_id}
              onChange={(e) =>
                updateIngredient(i, 'ingredient_id', Number(e.target.value))
              }
              required
            >
              <option defaultValue={''}>Ингредиент</option>
              {ingredients.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <input
              type='number'
              className={`${styles.inputField} ${styles.miniField}`}
              placeholder='Кол-во'
              value={ing.amount}
              onChange={(e) => updateIngredient(i, 'amount', e.target.value)}
              required
            />

            <select
              className={`${styles.selectField} ${styles.miniField}`}
              value={ing.unit}
              onChange={(e) => updateIngredient(i, 'unit', e.target.value)}
            >
              <option value='g'>g</option>
              <option value='ml'>ml</option>
            </select>

            {form.ingredients.length > 1 && (
              <button
                type='button'
                className={styles.removeBtn}
                onClick={() => removeIngredient(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type='button' className={styles.addBtn} onClick={addIngredient}>
          + Добавить ингредиент
        </button>
      </div>

      <div className={styles.block}>
        <span className={styles.blockTitle}>Шаги</span>

        {form.steps.map((step, i) => (
          <div key={i} className={styles.stepRow}>
            <textarea
              className={styles.textareaField}
              placeholder={`Шаг ${i + 1}`}
              value={step}
              onChange={(e) => updateStep(i, e.target.value)}
              required
            />
            {form.steps.length > 1 && (
              <button
                type='button'
                className={styles.removeBtn}
                onClick={() => removeStep(i)}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button type='button' className={styles.addBtn} onClick={addStep}>
          + Добавить шаг
        </button>
      </div>

      <div className={styles.buttonContainer}>
        <input
          type='submit'
          className={styles.submitButton}
          value='Отправить рецепт'
        />
      </div>
    </form>
  );
};

export default AddRecipeForm;
