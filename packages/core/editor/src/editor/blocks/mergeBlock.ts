import { Editor, Element, Node, Path, Text, Transforms } from 'slate';
import { findPluginBlockByPath } from '../../utils/findPluginBlockByPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { getLastNode, getLastNodePoint } from '../../utils/getLastNodePoint';
import { YooptaOperation } from '../core/applyTransforms';
import { Elements } from '../elements';
import { Paths } from '../paths';
import { YooEditor } from '../types';
import { ReactEditor } from 'slate-react';

export function mergeBlock(editor: YooEditor) {
  const currentBlock = findPluginBlockByPath(editor);
  const slateToRemove = findSlateBySelectionPath(editor, { at: editor.path.current });

  const prevBlockPath = Paths.getPreviousPath(editor);
  const slateMergedInto = findSlateBySelectionPath(editor, { at: prevBlockPath });
  const blockMergeInto = findPluginBlockByPath(editor, { at: prevBlockPath });
  const blockEntityToMerge = editor.blocks[blockMergeInto?.type || ''];

  if (!slateToRemove || !slateToRemove.selection || !currentBlock || !slateMergedInto || !blockMergeInto) return;

  const prevBlockElementRoot = Elements.getElement(editor, blockMergeInto.id);

  // [TODO] - if prev block has custom editor (not slate) or root element is void we need jump to prev prev block
  if (!blockEntityToMerge) return;
  if (blockEntityToMerge.hasCustomEditor) return;
  if (prevBlockElementRoot?.props?.nodeType === 'void') return;

  const point = getLastNodePoint(slateMergedInto);
  Transforms.select(slateMergedInto, point);

  Editor.withoutNormalizing(slateMergedInto, () => {
    if (!slateToRemove.selection) return;

    const operations: YooptaOperation[] = [];
    const [, lastPath] = Editor.last(slateMergedInto, []);
    const lastElementNodeEntry = Editor.above(slateMergedInto, { at: lastPath, match: Element.isElement });

    const childNodeEntries = Array.from(
      Editor.nodes(slateToRemove, {
        at: [0],
        match: (n) => !Editor.isEditor(n) && (Text.isText(n) || Editor.isInline(slateToRemove, n)),
        mode: 'highest',
      }),
    );

    const childNodes = childNodeEntries.map(([node]) => node);

    if (
      lastElementNodeEntry &&
      Element.isElement(lastElementNodeEntry[0]) &&
      Editor.isInline(slateMergedInto, lastElementNodeEntry[0])
    ) {
      const insertPath = Path.next(lastElementNodeEntry[1]);
      Transforms.insertNodes(slateMergedInto, childNodes, { at: insertPath });
    } else {
      Transforms.insertNodes(slateMergedInto, childNodes, { at: Editor.end(slateMergedInto, []) });
    }

    const mergedBlock = {
      ...blockMergeInto,
      value: slateMergedInto.children,
    };

    operations.push({
      type: 'merge_block',
      sourceProperties: currentBlock,
      targetProperties: blockMergeInto,
      mergedProperties: mergedBlock,
      slate: slateMergedInto,
    });

    editor.applyTransforms(operations);

    editor.setPath({ current: blockMergeInto.meta.order });
    ReactEditor.focus(slateMergedInto);
  });
}

const slate = [
  {
    id: '1645bad8-be71-4b1e-9dda-6bfaefe12228',
    type: 'paragraph',
    children: [
      {
        text: '👋 ',
      },
      {
        text: 'We’ve returned with the Medium Newsletter\n',
        bold: true,
      },
      {
        text: 'Issue #187: analyzing tech layoffs and observing without absorbing\nBy ',
        italic: true,
      },
      {
        id: 'b95e3bc1-3f17-4434-acc8-9cc37158d177',
        type: 'link',
        props: {
          url: 'https://medium.com/u/7428661d5cfd?source=post_page-----917d3fb90711--------------------------------',
          target: '_blank',
          rel: 'noopener',
          title: 'Harris Sockel',
          nodeType: 'inline',
        },
        children: [
          {
            italic: true,
            text: 'Harris Sockel',
          },
          {
            text: '“I awoke about 2 a.m. the night of the storm to the sound of small explosions in the street,” writes Asheville resident ',
          },
          {
            id: '27d9e455-6e30-49c0-8dce-c92ccad2d66d',
            type: 'link',
            props: {
              url: 'https://medium.com/u/2c55fbba6368?source=post_page-----917d3fb90711--------------------------------',
              target: '_blank',
              rel: 'noopener',
              title: 'Doug Brown',
              nodeType: 'inline',
            },
            children: [
              {
                text: 'Doug Brown',
              },
            ],
          },
          {
            text: ' in a',
          },
          {
            id: '74b96563-849e-4ddf-960d-3c115d9f43fc',
            type: 'link',
            props: {
              url: 'https://medium.com/the-narrative-arc/my-hurricane-helene-strength-training-program-2896fbec15ad?sk=v2%2Fbfe9a41d-a077-4c1f-8b38-519263f1f047',
              target: '_blank',
              rel: 'noopener',
              title: ' story',
              nodeType: 'inline',
            },
            children: [
              {
                text: ' story',
              },
            ],
          },
          {
            text: ' about life after Hurricane Helene. “My room kept lighting up in odd colors. I looked out the window and saw sparks flying in all directions in iridescent blues and greens. It would have been beautiful if it were not terrifying.”',
          },
        ],
      },
      {
        text: '',
      },
    ],
    props: {
      nodeType: 'block',
    },
  },
];
