import { Nunito } from 'next/font/google';
import Header from '@ui/Header';
import '@styles/globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'cyrillic'],
});

export const metadata = {
  title: 'Meal Buddy - ваш помощник в мире готовки',
  description: 'Помощник для людей которые хотят приготивить блюдо',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body className={`${nunito.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
