import React, { useLayoutEffect, useRef, useState } from 'react';
import { useEvent } from '../hooks/useEvent';
import { buildCroppedText, splitTextToWords } from './cropTextByRows';
import './cropped-text.css';

export interface CroppedTextProps {
  className?: string;
  children: string;
  opened: boolean;
  rows?: number;
}

const INITIAL_TEXT = 'I';

export function CroppedText({ className, children, opened, rows = 3 }: CroppedTextProps) {
  const [text, setText] = useState(INITIAL_TEXT);

  const rootRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<string[]>([]);
  const lineHeightRef = useRef<number | null>(null);
  const minRef = useRef(0);
  const maxRef = useRef(0);
  const midRef = useRef(0);
  const recentTextsRef = useRef<string[]>([]);
  const maxHeightRef = useRef(0);

  const resetSearch = useEvent(() => {
    if (!lineHeightRef.current) {
      return;
    }

    maxHeightRef.current = Math.round(lineHeightRef.current * rows);
    recentTextsRef.current = [];
    minRef.current = 0;
    midRef.current = 0;
    maxRef.current = Math.max(wordsRef.current.length - 1, 0);
  });

  const restartCropping = useEvent(() => {
    setText(INITIAL_TEXT);
    resetSearch();
  });

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    lineHeightRef.current = root.getBoundingClientRect().height;
    wordsRef.current = splitTextToWords(children);
    resetSearch();

    return undefined;
  }, [children, resetSearch]);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || opened) {
      return undefined;
    }

    let frameId = 0;
    let previousWidth = root.getBoundingClientRect().width;

    const handleResize = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        restartCropping();
      });
    };

    handleResize();

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nextWidth = entry.contentRect.width;

        if (nextWidth !== previousWidth) {
          previousWidth = nextWidth;
          handleResize();
        }
      }
    });

    observer.observe(root);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [opened, restartCropping, rows]);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root || opened || wordsRef.current.length === 0) {
      return undefined;
    }

    const rememberText = (callback: () => void) => {
      const recentTexts = recentTextsRef.current;

      if (recentTexts.length < 3) {
        recentTexts.push(text);
        callback();
        return;
      }

      recentTexts.shift();
      recentTexts.push(text);

      if (recentTexts[0] === recentTexts[2]) {
        resetSearch();
        return;
      }

      callback();
    };

    rememberText(() => {
      const currentHeight = root.getBoundingClientRect().height;
      const fits = currentHeight <= maxHeightRef.current;

      if (fits) {
        minRef.current = midRef.current;
      } else {
        maxRef.current = midRef.current - 1;
      }

      midRef.current = Math.round((minRef.current + maxRef.current) / 2);
      setText(buildCroppedText(wordsRef.current, midRef.current));
    });

    return undefined;
  }, [opened, resetSearch, text, children]);

  return (
    <p ref={rootRef} className={className ? `cropped-text ${className}` : 'cropped-text'}>
      {opened ? children : text}
    </p>
  );
}
