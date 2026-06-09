import { Layout } from './Layout';

export default {
  title: 'Components/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoTitle: { control: 'text' },
    headerContent: { control: false },
    children: { control: 'text' },
  },
};

export const Default = {
  args: {
    logoTitle: 'FinanceApp',
    headerContent: <span style={{ color: '#6b7280', fontSize: 14 }}>Меню</span>,
    children: 'Контент страницы',
  },
};
