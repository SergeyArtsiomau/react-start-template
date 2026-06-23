import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentDescription } from './ComponentDescription';
import { CroppedText, type CroppedTextProps } from './CroppedText';

const DEMO_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at, dolore earum enim est eveniet facilis illo impedit in, itaque maxime necessitatibus nesciunt nihil non officiis placeat provident quasi reiciendis.';

const COMPONENT_DESCRIPTION =
  'Компонент обрезает текст по заданному количеству строк. При изменении ширины контейнера пересчитывает обрезку через ResizeObserver. В режиме opened показывает полный текст.';

interface CroppedTextStoryProps extends CroppedTextProps {
  resizable?: boolean;
}

function CroppedTextStory({ resizable = true, ...props }: CroppedTextStoryProps) {
  return (
    <ComponentDescription title="CroppedText" description={COMPONENT_DESCRIPTION}>
      <div
        className={resizable ? 'cropped-text-demo__panel' : 'cropped-text-demo__panel cropped-text-demo__panel--fixed'}
      >
        <p className="cropped-text-demo__label">
          {resizable ? 'Потяните за правый край блока' : 'Фиксированная ширина'}
        </p>
        <CroppedText {...props} />
      </div>
    </ComponentDescription>
  );
}

const meta: Meta<typeof CroppedTextStory> = {
  title: 'Components/CroppedText',
  component: CroppedTextStory,
  tags: ['autodocs'],
  argTypes: {
    opened: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 6 } },
    children: { control: 'text' },
    resizable: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof CroppedTextStory>;

export const Default: Story = {
  args: {
    opened: false,
    rows: 1,
    children: DEMO_TEXT,
    resizable: true,
  },
};

export const ThreeRows: Story = {
  args: {
    opened: false,
    rows: 3,
    children: DEMO_TEXT,
    resizable: true,
  },
};

export const Opened: Story = {
  args: {
    opened: true,
    rows: 2,
    children: DEMO_TEXT,
    resizable: true,
  },
};

function ToggleOpenedStory() {
  const [opened, setOpened] = useState(false);

  return (
    <ComponentDescription title="CroppedText" description={COMPONENT_DESCRIPTION}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button type="button" onClick={() => setOpened((value) => !value)}>
          {opened ? 'Свернуть' : 'Показать полностью'}
        </button>
        <div className="cropped-text-demo__panel">
          <CroppedText opened={opened} rows={2}>
            {DEMO_TEXT}
          </CroppedText>
        </div>
      </div>
    </ComponentDescription>
  );
}

export const ToggleOpened: Story = {
  render: () => <ToggleOpenedStory />,
};

export const FinanceDescription: Story = {
  args: {
    opened: false,
    rows: 2,
    children:
      'Еженедельная закупка продуктов для семьи, включая овощи, фрукты, бытовую химию и товары для дома. Сумма может меняться в зависимости от акций в магазине.',
    resizable: true,
  },
};
