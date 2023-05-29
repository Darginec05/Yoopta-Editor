import { nanoid } from 'nanoid';

function getFallbackUUID() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

export const generateId = () => {
  if (typeof window === 'undefined') return nanoid();
  if (typeof window.crypto?.randomUUID !== 'function') return getFallbackUUID();

  return nanoid();
};
