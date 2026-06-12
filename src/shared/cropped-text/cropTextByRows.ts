const ELLIPSIS = '...';

export const buildCroppedText = (words: string[], visibleWordsCount: number): string => {
  if (visibleWordsCount <= 0) {
    return '';
  }

  if (visibleWordsCount >= words.length) {
    return words.join(' ');
  }

  return `${words.slice(0, visibleWordsCount).join(' ')} ${ELLIPSIS}`;
};

export const splitTextToWords = (text: string): string[] => text.split(/\s+/).filter(Boolean);
