import { YooptaOperation } from './applyTransforms';
import { YooEditor } from '../types';

export function batchOperations(editor: YooEditor, callback: () => void) {
  const operations: YooptaOperation[] = [];
  let options = {};
  const originalApplyTransforms = editor.applyTransforms;

  editor.applyTransforms = (ops: YooptaOperation[], applyOptions) => {
    if (applyOptions) options = applyOptions;
    operations.push(...ops);
  };

  callback();

  editor.applyTransforms = originalApplyTransforms;

  if (operations.length > 0) {
    editor.applyTransforms(operations, options);
  }
}
