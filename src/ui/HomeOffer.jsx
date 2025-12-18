import Image from 'next/image';
import Link from 'next/link';

import styles from '@styles/homeOffer.module.css';

const HomeOffer = () => {
  return (
    <section className={styles.mainOffer}>
      <div className={styles.offerContent}>
        <h1 className={styles.offerTitle}>
          Готовьте легко, вкусно и с радостью!
        </h1>
        <div className={styles.divider} />
        <p className={styles.offerSubtitle}>
          Забудьте о «что приготовить?» — подберём идеальное блюдо под ваше
          настроение, продукты в холодильнике и время на готовку.
        </p>
        <Link href='/recipes' className={styles.buttonLink}>
          <button className={styles.offerButton}>Перейти к рецептам</button>
        </Link>
      </div>
      <div className={styles.offerImgWrapper}>
        <Image src='/img/HomeOfferImage.png' alt='Food photo' fill priority />
      </div>
    </section>
  );
};

export default HomeOffer;
