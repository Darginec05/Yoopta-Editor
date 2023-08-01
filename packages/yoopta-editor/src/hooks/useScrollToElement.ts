import { useEffect } from 'react';

export const useScrollToElement = () => {
  useEffect(() => {
    const elementId = window.location.hash.length > 0 ? window.location.hash.replace('#', '') : null;

    if (elementId) {
      const element = document.getElementById(elementId) || document.querySelector(`[data-element-id="${elementId}"]`);

      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return null;
};
