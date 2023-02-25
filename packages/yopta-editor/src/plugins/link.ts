import { KeyboardEvent } from 'react';
import { v4 } from 'uuid';
import { Editor, Element, Transforms } from 'slate';
import { ELEMENT_TYPES_MAP } from '../components/Editor/constants';

export const createLinkPlugin = (editor: Editor) => {
  return {
    handlers: {
      onSpace: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;
      },
      onEnter: (event: KeyboardEvent<HTMLDivElement>) => {
        if (!editor.selection) return;
      },
    },
  };
};
