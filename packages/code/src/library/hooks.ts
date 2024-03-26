import { EditorView } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useEffect, useState } from 'react';

export const useCodeMirror = ({ extensions }) => {
  const [element, setElement] = useState<HTMLElement>();

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const view = new EditorView({
      state: EditorState.create({
        extensions: [javascript()],
      }),
      parent: element,
    });

    return () => view.destroy();
  }, [element]);

  return { ref };
};
