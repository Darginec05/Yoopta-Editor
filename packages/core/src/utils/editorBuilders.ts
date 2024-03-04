import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor, Editor } from 'slate';
import { YooEditor } from '../editor/types';
import { PluginReturn, PluginElement } from '../plugins/types';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
import { createBlock } from '../editor/transforms/createBlock';
import { getValue } from '../editor/textFormats/getValue';
import { isActive } from '../editor/textFormats/isActive';
import { toggle } from '../editor/textFormats/toggle';
import { update } from '../editor/textFormats/update';
import { withShortcuts } from '../extenstions/shortcuts';
import { getRootBlockElement } from './blockElements';

export function buildMarks(editor, marks: YooptaMark<any>[]) {
  const formats: YooEditor['formats'] = {};

  marks.forEach((mark) => {
    const type = mark.type;
    formats[type] = {
      hotkey: mark.hotkey,
      type,
      getValue: () => getValue(editor, type),
      isActive: () => isActive(editor, type),
      toggle: () => toggle(editor, type),
      update: (props) => update(editor, type, props),
    };
  });

  return formats;
}

export function buildBlocks(editor, plugins: PluginReturn<string, PluginElement<unknown>>[]) {
  const blocks: YooEditor['blocks'] = {};

  plugins.forEach((plugin, index) => {
    const rootBlockElement = getRootBlockElement(plugin.elements);
    const nodeType = rootBlockElement?.props?.nodeType;
    const isInline = nodeType === 'inline' || nodeType === 'inlineVoid';

    if (!isInline) {
      const elements = {};
      Object.keys(plugin.elements).forEach((key) => {
        const { render, ...element } = plugin.elements[key];
        elements[key] = element;
      });

      blocks[plugin.type] = {
        type: plugin.type,
        elements,
        order: index,
        // withCustomEditor: plugin.options?.withCustomEditor,
        // options: plugin.options,
        isActive: () => {
          const block = findPluginBlockBySelectionPath(editor, { at: editor.selection });
          return block?.type === plugin.type;
        },
        create: (options) => {
          createBlock(editor, plugin.type, options);
        },
        update: () => {
          console.log('block.update');
        },
        delete: () => {
          console.log('block.delete');
        },
      };
    }
  });

  return blocks;
}

export function buildBlockSlateEditors(editor: YooEditor) {
  const blockEditorsMap = {};

  Object.keys(editor.children).forEach((id) => {
    const slate = buildSlateEditor(editor);
    blockEditorsMap[id] = slate;
  });

  return blockEditorsMap;
}

export function buildSlateEditor(editor: YooEditor): Editor {
  const slate = withHistory(withShortcuts(editor, withReact(createEditor())));
  return slate;
}

export function buildBlockShortcuts(editor: YooEditor) {
  const shortcuts = {};

  Object.values(editor.blocks).forEach((block) => {
    const hasShortcuts =
      block.options && Array.isArray(block.options?.shortcuts) && block.options?.shortcuts.length > 0;

    if (hasShortcuts) {
      block.options?.shortcuts?.forEach((shortcut) => {
        shortcuts[shortcut] = block;
      });
    }
  });

  return shortcuts;
}
