'use client';

import AddRecipeForm from '@components/AddRecipeForm';
import styles from '@styles/addRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <>
      <section className={styles.addRecipeNeedToKnow}>
        <div className={styles.needToKnow}>
          <h1>Что важно знать перед отправкой рецепта?</h1>
          <ul className={styles.needToKnowBody}>
            <li className={styles.needToKnowLabel}>
              Указывайте понятное и точное название блюда. Описание должно
              кратко объяснять, что это за блюдо и чем оно примечательно.
              Избегайте бессмысленных символов, капслока и слишком коротких
              текстов.
            </li>
            <li className={styles.needToKnowLabel}>
              Используйте только существующие ингредиенты из списка. Указывайте
              реальное количество ингредиентов и корректные единицы измерения (г
              или мл). Не дублируйте один и тот же ингредиент несколько раз —
              объединяйте их.
            </li>
            <li className={styles.needToKnowLabel}>
              Каждый шаг должен описывать одно логическое действие. Пишите шаги
              в правильном порядке и понятным языком. Не используйте слишком
              короткие или пустые шаги (например: «готово»).
            </li>
            <li className={styles.needToKnowLabel}>
              Рецепт должен быть оригинальным или переработанным вами. Запрещено
              размещать оскорбительный, вводящий в заблуждение или рекламный
              контент. Рецепты, не соответствующие правилам, могут быть
              отправлены на доработку или отклонены.
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.addRecipeForm}>
        <AddRecipeForm />
      </section>
    </>
  );
};

export default AddRecipePage;
