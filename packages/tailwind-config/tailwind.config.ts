import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import tailwindForms from '@tailwindcss/forms';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)'],
      },
      screens: {
        '3xl': '1792px',
        xs: '30rem',
      },
      colors: {
        ...colors,

        body: '#ffffff',
        error: '#f8719d',
        textPrimary: '#121312',
        textSecondary: '#8f8e93',

        secondary: '#99E515',
        secondaryHover: '#8BD013',

        link: '#38ab0e',
        linkHover: '#2c9147',

        bgPrimaryContainer: '#F4F5FA',
        bgSecondaryContainer: '#353547',
        bgSecondaryContainerHover: '#27273D',
      },
      fontSize: {
        xxxs: '0.5625rem', // 9px
        xxs: '0.625rem', // 10px
        sm: '0.875rem', // 14px
        4: '1rem', // 16px
        5: '1.25rem', // 20px
        6: '1.5rem', // 24px
        7: '1.75rem', // 28px
        8: '2rem', // 32px
        9: '2.25rem', // 36px
        10: '2.5rem', // 40px
      },
      opacity: {
        80: '0.80',
      },
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [tailwindForms],
};
export default config;
