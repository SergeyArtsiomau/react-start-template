import React, { type ReactNode } from 'react';
import './cropped-text.css';

interface ComponentDescriptionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ComponentDescription({ title, description, children }: ComponentDescriptionProps) {
  return (
    <div className="cropped-text-demo">
      <div className="cropped-text-demo__info">
        <h3 className="cropped-text-demo__title">{title}</h3>
        <p className="cropped-text-demo__desc">{description}</p>
      </div>
      {children}
    </div>
  );
}
