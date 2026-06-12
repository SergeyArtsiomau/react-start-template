import React, { useState } from 'react';
import './accordion.css';

type AccordionItemData = {
  id: string;
  title: string;
  content: string;
};

const ITEMS: AccordionItemData[] = [
  { id: '1', title: 'Что такое FinanceApp?', content: 'Приложение для учёта личных финансов и операций.' },
  { id: '2', title: 'Как добавить операцию?', content: 'Операции можно добавлять вручную или импортировать из выписки.' },
  { id: '3', title: 'Какие есть категории?', content: 'Продукты, транспорт, развлечения, здоровье и другие.' },
];

/**
 * До рефакторинга: монолитный компонент с массивом items.
 * Сложно кастомизировать разметку отдельных секций.
 */
export function AccordionBefore() {
  const [openId, setOpenId] = useState<string | null>(ITEMS[0].id);

  return (
    <div>
      {ITEMS.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="accordion-before__item">
            <button
              type="button"
              className="accordion-before__title"
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              {item.title}
            </button>
            {isOpen && <div className="accordion-before__content">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
