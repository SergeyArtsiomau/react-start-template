import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { AccordionBefore } from './AccordionBefore';

const meta: Meta = {
  title: 'Homework/Patterns/1 Compound Components',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Before: Story = {
  render: () => <AccordionBefore />,
};

export const After: Story = {
  render: () => (
    <Accordion defaultOpenIndex={0}>
      <Accordion.Item index={0}>
        <Accordion.Header>Что такое FinanceApp?</Accordion.Header>
        <Accordion.Body>Приложение для учёта личных финансов и операций.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index={1}>
        <Accordion.Header>Как добавить операцию?</Accordion.Header>
        <Accordion.Body>Операции можно добавлять вручную или импортировать из выписки.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item index={2}>
        <Accordion.Header>Какие есть категории?</Accordion.Header>
        <Accordion.Body>Продукты, транспорт, развлечения, здоровье и другие.</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  ),
};
