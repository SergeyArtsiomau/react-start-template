import React, { type ReactNode } from 'react';
import { AccordionProvider, useAccordionContext } from './AccordionContext';
import './accordion.css';

interface AccordionProps {
  children: ReactNode;
  defaultOpenIndex?: number | null;
}

interface AccordionItemProps {
  index: number;
  children: ReactNode;
}

interface AccordionIndexedProps {
  children: ReactNode;
  index?: number;
}

function AccordionRoot({ children, defaultOpenIndex = 0 }: AccordionProps) {
  return (
    <AccordionProvider defaultOpenIndex={defaultOpenIndex}>
      <div className="accordion">{children}</div>
    </AccordionProvider>
  );
}

function AccordionItem({ index, children }: AccordionItemProps) {
  return (
    <div className="accordion__item">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child as React.ReactElement<AccordionIndexedProps>, { index });
      })}
    </div>
  );
}

function AccordionHeader({ children, index = 0 }: AccordionIndexedProps) {
  const { openIndex, toggleIndex } = useAccordionContext();
  const isOpen = openIndex === index;

  return (
    <button
      type="button"
      className={`accordion__header${isOpen ? ' accordion__header--active' : ''}`}
      onClick={() => toggleIndex(index)}
    >
      {children}
    </button>
  );
}

function AccordionBody({ children, index = 0 }: AccordionIndexedProps) {
  const { openIndex } = useAccordionContext();

  if (openIndex !== index) {
    return null;
  }

  return <div className="accordion__body">{children}</div>;
}

export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Header: AccordionHeader,
  Body: AccordionBody,
});
