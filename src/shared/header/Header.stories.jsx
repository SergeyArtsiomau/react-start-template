import { Header } from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoTitle: { control: 'text' },
    children: { control: false },
  },
};

export const Default = {
  args: {
    logoTitle: 'FinanceApp',
    children: <span style={{ color: '#6b7280', fontSize: 14 }}>Навигация</span>,
  },
};

export const StickyScroll = {
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ height: '200vh', padding: 24, background: '#f9fafb' }}>
        <p>Прокрутите страницу — Header остаётся сверху</p>
      </div>
    </div>
  ),
  args: {
    logoTitle: 'FinanceApp',
  },
};
