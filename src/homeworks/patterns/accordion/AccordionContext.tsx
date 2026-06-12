import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface AccordionContextValue {
  openIndex: number | null;
  toggleIndex: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionProviderProps {
  children: ReactNode;
  defaultOpenIndex?: number | null;
}

export function AccordionProvider({ children, defaultOpenIndex = 0 }: AccordionProviderProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const value = useMemo(
    () => ({
      openIndex,
      toggleIndex: (index: number) => {
        setOpenIndex((current) => (current === index ? null : index));
      },
    }),
    [openIndex],
  );

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
}

export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion-компоненты должны использоваться внутри Accordion');
  }

  return context;
}
