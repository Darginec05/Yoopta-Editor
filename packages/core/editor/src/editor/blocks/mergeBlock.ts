import { Editor, Text, Transforms } from 'slate';
import { findPluginBlockByPath } from '../../utils/findPluginBlockByPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { getLastNodePoint } from '../../utils/getLastNodePoint';
import { YooptaOperation } from '../core/applyTransforms';
import { Elements } from '../elements';
import { Paths } from '../paths';
import { SlateElement, YooEditor } from '../types';
import { ReactEditor } from 'slate-react';

export function mergeBlock(editor: YooEditor) {
  const sourceBlock = findPluginBlockByPath(editor);
  const sourceSlate = findSlateBySelectionPath(editor, { at: editor.path.current });

  const prevBlockPath = Paths.getPreviousPath(editor);
  const targetSlate = findSlateBySelectionPath(editor, { at: prevBlockPath });
  const targetBlock = findPluginBlockByPath(editor, { at: prevBlockPath });
  const targetBlockEntity = editor.blocks[targetBlock?.type || ''];

  if (!sourceSlate || !sourceBlock || !targetSlate || !targetBlock) return;

  const prevBlockElementRoot = Elements.getElement(editor, targetBlock.id);

  if (!targetBlockEntity) return;
  if (targetBlockEntity.hasCustomEditor) return;
  if (prevBlockElementRoot?.props?.nodeType === 'void') return;

  try {
    const point = getLastNodePoint(targetSlate);
    Transforms.select(targetSlate, point);
  } catch (error) {
    Transforms.select(targetSlate, Editor.start(targetSlate, []));
  }

  Editor.withoutNormalizing(targetSlate, () => {
    const operations: YooptaOperation[] = [];
    const mergedChildren = mergeSlateChildren(targetSlate.children[0], sourceSlate.children[0]);
    const mergedSlateValue = [
      {
        ...targetSlate.children[0],
        children: mergedChildren,
      },
    ];

    const mergedBlock = {
      ...targetBlock,
      value: mergedSlateValue,
    };

    operations.push({
      type: 'merge_block',
      prevProperties: {
        sourceBlock: sourceBlock,
        sourceSlateValue: sourceSlate.children as SlateElement[],
        targetBlock,
        targetSlateValue: targetSlate.children as SlateElement[],
      },
      properties: {
        mergedBlock,
        mergedSlateValue: mergedSlateValue as SlateElement[],
      },
      path: editor.path,
    });

    editor.applyTransforms(operations);
    editor.setPath({ current: targetBlock.meta.order });

    try {
      ReactEditor.focus(targetSlate);
    } catch (error) {
      console.error('Error setting focus:', error);
    }
  });
}

function mergeSlateChildren(target, source) {
  const targetChildren = JSON.parse(JSON.stringify(target.children));
  const sourceChildren = JSON.parse(JSON.stringify(source.children));

  const lastTargetChild = targetChildren[targetChildren.length - 1];
  const firstSourceChild = sourceChildren[0];

  if (Text.isText(lastTargetChild) && Text.isText(firstSourceChild)) {
    lastTargetChild.text += firstSourceChild.text;
    return [...targetChildren.slice(0, -1), lastTargetChild, ...sourceChildren.slice(1)];
  } else {
    return [...targetChildren, ...sourceChildren];
  }
}
