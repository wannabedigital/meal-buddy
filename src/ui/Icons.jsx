const defaultIconColor = '#3E332A';

export const BurgerMenu = ({ color = defaultIconColor }) => {
  return (
    <svg
      width='60'
      height='60'
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_90_2)'>
        <path
          d='M10 45H50C51.375 45 52.5 43.875 52.5 42.5C52.5 41.125 51.375 40 50 40H10C8.625 40 7.5 41.125 7.5 42.5C7.5 43.875 8.625 45 10 45ZM10 32.5H50C51.375 32.5 52.5 31.375 52.5 30C52.5 28.625 51.375 27.5 50 27.5H10C8.625 27.5 7.5 28.625 7.5 30C7.5 31.375 8.625 32.5 10 32.5ZM7.5 17.5C7.5 18.875 8.625 20 10 20H50C51.375 20 52.5 18.875 52.5 17.5C52.5 16.125 51.375 15 50 15H10C8.625 15 7.5 16.125 7.5 17.5Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_90_2'>
          <rect width='60' height='60' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Profile = ({ color = defaultIconColor }) => {
  return (
    <svg
      width='60'
      height='60'
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_67_193)'>
        <path
          d='M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM30 15C34.825 15 38.75 18.925 38.75 23.75C38.75 28.575 34.825 32.5 30 32.5C25.175 32.5 21.25 28.575 21.25 23.75C21.25 18.925 25.175 15 30 15ZM30 50C24.925 50 18.925 47.95 14.65 42.8C18.875 39.5 24.2 37.5 30 37.5C35.8 37.5 41.125 39.5 45.35 42.8C41.075 47.95 35.075 50 30 50Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_67_193'>
          <rect width='60' height='60' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Login = ({ color = defaultIconColor }) => {
  return (
    <svg
      width='60'
      height='60'
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_67_182)'>
        <path
          d='M25.75 19.25C24.775 20.225 24.775 21.775 25.75 22.75L30.5 27.5H7.5C6.125 27.5 5 28.625 5 30C5 31.375 6.125 32.5 7.5 32.5H30.5L25.75 37.25C24.775 38.225 24.775 39.775 25.75 40.75C26.725 41.725 28.275 41.725 29.25 40.75L38.225 31.775C39.2 30.8 39.2 29.225 38.225 28.25L29.25 19.25C28.275 18.275 26.725 18.275 25.75 19.25ZM50 47.5H32.5C31.125 47.5 30 48.625 30 50C30 51.375 31.125 52.5 32.5 52.5H50C52.75 52.5 55 50.25 55 47.5V12.5C55 9.75 52.75 7.5 50 7.5H32.5C31.125 7.5 30 8.625 30 10C30 11.375 31.125 12.5 32.5 12.5H50V47.5Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_67_182'>
          <rect width='60' height='60' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
