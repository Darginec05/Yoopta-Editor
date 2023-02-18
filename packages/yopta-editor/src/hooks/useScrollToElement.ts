import { useEffect } from 'react';

export const useScrollToElement = () => {
  useEffect(() => {
    const elementId = window.location.hash.length > 0 ? window.location.hash.replace('#', '') : null;

    if (elementId) {
      const element = document.getElementById(elementId) || document.querySelector(`[data-node-id="${elementId}"]`);

      element?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
    }
  }, []);

  return null;
};
