export type StyleAttribute = {
  [key: string]: string | number;
};

export function styleObjectToString(style?: StyleAttribute): string {
  if (!style) return '';

  return Object.entries(style)
    .map(([key, value]) => {
      const cssKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      return `${cssKey}: ${value}${typeof value === 'number' ? 'px' : ''};`;
    })
    .join(' ');
}
