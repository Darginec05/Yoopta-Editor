import { Editor, Text, Element as SlateElement, Transforms, Range } from 'slate';
import { ReactEditor } from 'slate-react';
import { v4 } from 'uuid';
import { LinkElement } from './types';
import { ELEMENT_TYPES_MAP } from './constants';

export const HOTKEYS: Record<string, string> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const isMarkActive = (editor: Editor, mark: any): boolean => {
  const marks: Omit<Text, 'text'> | null = Editor.marks(editor);

  return !!marks?.[mark];
};

export const getMatchedNode = (editor: Editor, type: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
    }),
  );

  return match;
};

export const isBlockActive = (editor: Editor, type: any) => !!getMatchedNode(editor, type);

type ToggleMode = 'toggle' | 'add';

// [TODO] - fix deleting '/' after adding or toggling nodes
export const toggleBlock = (
  editor: Editor,
  blockType: any,
  data: any = { isVoid: false },
  mode: ToggleMode = 'toggle',
) => {
  Editor.withoutNormalizing(editor, () => {
    const isActive = isBlockActive(editor, blockType);
    const isList = LIST_TYPES.includes(blockType);

    if (mode === 'add') {
      const node = {
        id: v4(),
        type: isList ? 'list-item' : blockType,
        ...data,
      };

      if (data.isVoid) {
        node.type = blockType;
      }

      const nextPath = editor.selection!.focus.path[0] + 1;

      Transforms.insertNodes(editor, node, {
        at: {
          focus: { path: [nextPath, 0], offset: 0 },
          anchor: { path: [nextPath, 0], offset: 0 },
        },
      });

      Transforms.select(editor, { path: [nextPath, 0], offset: 0 });
      ReactEditor.focus(editor);

      // [TODO] - refactor and fix adding list
      // if (isList) {
      //   Transforms.wrapNodes(editor, node, {
      //     at: { path: [nextPath, 0], offset: 0 },
      //   });
      // }

      return;
    }

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
      split: true,
      at: editor.selection?.anchor,
    });

    const node = {
      id: v4(),
      // eslint-disable-next-line no-nested-ternary
      type: isActive ? 'paragraph' : isList ? 'list-item' : blockType,
      ...data,
    };

    if (data.isVoid) {
      node.type = blockType;
    }

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });

    if (!isActive && isList) {
      const block = { id: v4(), type: blockType, children: [{ text: '' }] };
      Transforms.wrapNodes(editor, block, {
        at: editor.selection?.anchor,
      });
    }
  });
};

export const toggleMark = (editor: Editor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const removeLinkNode = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === ELEMENT_TYPES_MAP.link,
  });
};

export const addLinkNode = (editor: Editor, url: string) => {
  if (isBlockActive(editor, ELEMENT_TYPES_MAP.link)) {
    removeLinkNode(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    id: v4(),
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const getRectByCurrentSelection = (): DOMRect | undefined => {
  const domSelection = window.getSelection();
  if (!domSelection) return;

  const domRange = domSelection.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  return rect;
};

export const getAbsPositionBySelection = (element?: HTMLElement) => {
  if (!element) return { top: -10000, left: -10000 };

  const selectionRect = getRectByCurrentSelection();

  if (!selectionRect) return {};

  const elementRect = element.getBoundingClientRect();

  return {
    top: selectionRect.top - elementRect.height,
    left: selectionRect.left + window.pageXOffset - elementRect.width / 2 + selectionRect.width / 2,
  };
};

export const KEYBOARD_SHORTCUTS = {
  '*': ELEMENT_TYPES_MAP['list-item'],
  '-': ELEMENT_TYPES_MAP['list-item'],
  '+': ELEMENT_TYPES_MAP['list-item'],
  '>': ELEMENT_TYPES_MAP['block-quote'],
  '<': ELEMENT_TYPES_MAP.callout,
  '#': ELEMENT_TYPES_MAP['heading-one'],
  '##': ELEMENT_TYPES_MAP['heading-two'],
  '###': ELEMENT_TYPES_MAP['heading-three'],
};

// eslint-disable-next-line max-len
export const DEFAULT_STATE =
  '[{"type":"heading-one","children":[{"marks":[],"text":"Measuring Web Performance at Airbnb"}]},{"type":"paragraph","children":[{"text":"Learn what web performance metrics Airbnb tracks, how we measure them, and how we consider tradeoffs between them in practice.j"}]},{"type":"paragraph","children":[{"text":"Josh Nelson","underline":true}]},{"type":"paragraph","children":[{"marks":[],"text":"How long did it take for this web page to load? It’s a common question industrywide, but is it the right "},{"type":"link","url":"https://kekce.ru","children":[{"marks":[],"text":"one"}]},{"marks":[],"text":"? Recently, there has been a "},{"marks":[],"text":"shift","bold":true},{"marks":[],"text":" from using single seconds-based metrics"},{"marks":[],"text":" ","italic":true},{"marks":[],"text":"like “page load”, to metrics that paint a more holistic picture of performance, representing the "},{"marks":[],"text":"experience","underline":true,"italic":true},{"marks":[],"text":" from a website user’s perspective. At "},{"marks":[],"text":"Airbnb","bold":true},{"marks":[],"text":", "},{"type":"link","url":"https://link.com","children":[{"marks":[],"text":"measuring"}]},{"marks":[],"text":" the web "},{"marks":[],"text":"performance","bold":true},{"marks":[],"text":" that our guests and hosts "},{"type":"link","url":"https://link.com","children":[{"marks":[],"text":"actually"}]},{"marks":[],"text":" experience is critical. Previously, we described how Airbnb created a "},{"marks":[],"text":"Page","italic":true},{"marks":[],"text":" Performance Score to combine multiple metrics from real users into a single score. In this blog post, we describe the metrics that we consider important on our website and how they relate to industry standards. We also discuss some case studies that moved these metrics, and how they impacted the experience of website visitors."}]},{"type":"heading-one","children":[{"text":"Web Performance Metrics","bold":true}]},{"type":"paragraph","children":[{"text":"There are five key performance metrics that we measure on our website. We chose these metrics because they represent performance as our users experience it, and because their definitions are simple, interpretable, and performant to compute.\\n\\nWe record these metrics both for direct requests to the site, as well as for client side transition requests between pages (Airbnb uses a single page app architecture). We will give an overview of these metrics, how we instrument them, and their relative weightings in our overall Page Performance Score."}]},{"type":"heading-two","children":[{"text":"Time To First Contentful Paint"}]},{"type":"paragraph","children":[{"text":"Time To First Contentful Paint ("},{"text":"TTFCP","underline":true},{"text":") measures the time between the start of navigation and the time at which "},{"text":"anything appears on the screen","bold":true},{"text":". This could be text, a loading spinner, or any visual confirmation to the user that the website has received their request. We use the paint timing API for direct requests. For client routed transitions, we have written our own instrumentation that is triggered when a page transition begins:"}]},{"type":"paragraph","children":[{"text":"It’s important to note this metric equires manual instrumentation by our product engineers — every page must include a “FMP-target”, or we’ll never record the first meaningful paint milestone. To ensure that each page instruments TTFMP correctly, we report on how often this element is found on a given page. If it is found less than 80% of the time due either to lack of instrumentation or to conditional rendering of the FMP target, we trigger alerts to warn that the metric is not valid for that page. This requires developers to keep the TTFMP instrumentation up to date through page e-designs, refactors, and A/B tests."}]},{"type":"block-quote","children":[{"text":"We have seen through experimentation that these metrics correlate with positive user experience changes. Web PPS gives us a single score we can use for goal setting and regression detection, while also capturing many different aspects of usr experience: paint timings, interactivity and layout stability. We hope that Web PPS can be used as a reference for implementing similar systems outside of Airbnb."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":""}]}]';
