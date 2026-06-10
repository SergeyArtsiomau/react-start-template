import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/app/providers/ThemeProvider';
import { LocaleProvider } from '../src/app/providers/LocaleProvider';
import '../src/app/styles/themes.scss';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <LocaleProvider>
          <Story />
        </LocaleProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
