import Image from 'next/image';
import Link from 'next/link';

import styles from '@styles/homeOffer.module.css';

const HomeOffer = () => {
  return (
    <section className={styles.mainOffer}>
      <div className={styles.offerContent}>
        <h1 className={styles.offerTitle}>
          Твоя новая пара вкусных рецептов с доставкой прямо в кухню
        </h1>
        <div className={styles.divider} />
        <p className={styles.offerSubtitle}>
          Онлайн-кулинария для хорошего настроения – готовим легко и с
          удовольствием
        </p>
        <Link href='/recipes' className={styles.buttonLink}>
          <button className={styles.offerButton}>Посмотреть каталог</button>
        </Link>
      </div>
      <div className={styles.offerImgWrapper}>
        <Image src='/img/HomeOfferImage.png' alt='Food photo' fill priority />
      </div>
    </section>
  );
};

export default HomeOffer;
