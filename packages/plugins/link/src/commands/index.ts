import {
  Blocks,
  buildBlockData,
  Elements,
  generateId,
  SlateEditor,
  SlateElement,
  YooEditor,
  YooptaBlockPath,
} from '@yoopta/editor';
import { Editor, Element, Location, Span, Transforms } from 'slate';
import { LinkElement, LinkElementProps } from '../types';

type LinkElementOptions = {
  props: Omit<LinkElementProps, 'nodeType'>;
};

type LinkInsertOptions = LinkElementOptions & {
  selection: Location | undefined;
  focus?: boolean;
  slate: SlateEditor;
};

type DeleteElementOptions = {
  slate: SlateEditor;
};

export type LinkCommands = {
  buildLinkElements: (editor: YooEditor, options: LinkElementOptions) => LinkElement;
  insertLink: (editor: YooEditor, options: LinkInsertOptions) => void;
  deleteLink: (editor: YooEditor, options: DeleteElementOptions) => void;
  updateLink: (editor: YooEditor, options: Partial<LinkElementOptions>) => void;
};

export const LinkCommands: LinkCommands = {
  buildLinkElements: (editor, options) => {
    const { props } = options || {};
    const linkProps: LinkElementProps = { ...props, nodeType: 'inline' };
    return { id: generateId(), type: 'link', children: [{ text: props?.title || props?.url || '' }], props: linkProps };
  },
  insertLink: (editor, options) => {
    const { focus, props, slate } = options || {};

    if (!slate || !slate.selection) return;

    const linkElement = LinkCommands.buildLinkElements(editor, { props });
    console.log('insertLink linkElement', linkElement);
    console.log('insertLink slate.selection', slate.selection);

    const [linkNodeEntry] = Editor.nodes(slate, {
      at: slate.selection,
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });

    if (linkNodeEntry) {
      const [node, path] = linkNodeEntry;
      console.log('linkNodeEntry node', node);
    }

    Transforms.wrapNodes(slate, linkElement, { split: true, at: slate.selection });
    Transforms.setNodes(
      slate,
      { text: props?.title || props?.url || '' },
      {
        at: slate.selection,
        mode: 'lowest',
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      },
    );

    Editor.insertText(slate, props?.title || props?.url || '', { at: slate.selection });
    Transforms.collapse(slate, { edge: 'end' });
  },
  updateLink: (editor, options = {}) => {
    // const { at, focus, text, props } = options;
    // const link = LinkCommands.buildLinkElements(editor, { text, props });
    // Blocks.insertBlock(editor, buildBlockData({ value: [link], type: 'Link' }), { at, focus });
  },
  deleteLink: (editor, options) => {
    const { slate } = options;
    if (!slate || !slate.selection) return;

    const [linkNodeEntry] = Editor.nodes(slate, {
      at: slate.selection,
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    });

    if (linkNodeEntry) {
      Transforms.unwrapNodes(slate, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
        at: slate.selection,
      });
    }
  },
};
