import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { createEditor, Editor } from 'slate';
import { YooEditor, YooptaBlockData } from '../editor/types';
import { PluginReturn, PluginElement, PluginElementsMap } from '../plugins/types';
import { YooptaMark } from '../marks';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
import { createBlock } from '../editor/transforms/createBlock';
import { getValue } from '../editor/textFormats/getValue';
import { isActive } from '../editor/textFormats/isActive';
import { toggle } from '../editor/textFormats/toggle';
import { update } from '../editor/textFormats/update';
import { withShortcuts } from '../extensions/shortcuts';
import { getRootBlockElement } from './blockElements';
import { updateBlock } from '../editor/transforms/updateBlock';
import { updateBlockElement } from '../editor/transforms/updateBlockElement';
import { toggleBlock } from '../editor/transforms/toggleBlock';

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

      // Omit fetchers and other non-editor related options
      const { displayLabel, placeholder, align, shortcuts } = plugin.options || {};

      blocks[plugin.type] = {
        type: plugin.type,
        elements,
        order: index,
        // withCustomEditor: plugin.options?.withCustomEditor,
        options: {
          displayLabel,
          placeholder,
          align,
          shortcuts,
        },
        isActive: () => {
          const block = findPluginBlockBySelectionPath(editor, { at: editor.selection });
          return block?.type === plugin.type;
        },
        toggle: (toBlockType: string, options) => {
          toggleBlock(editor, toBlockType, options);
        },
        create: (options) => {
          createBlock(editor, plugin.type, options);
        },
        update: <TKeys extends string, TProps>(id: string, data: Partial<Pick<YooptaBlockData, 'meta' | 'value'>>) => {
          updateBlock(editor, id, data);
        },
        updateElement: <TKeys extends string, TProps>(blockId: string, elementType: TKeys, props: TProps) => {
          updateBlockElement(editor, blockId, elementType, props);
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

export function buildPlugins(
  plugins: PluginReturn<string, PluginElement<unknown>>[],
): Record<string, PluginReturn<string, unknown>> {
  const pluginsMap = {};
  const inlineTopLevelPlugins: PluginElementsMap<string, any> = {};

  plugins.forEach((plugin) => {
    if (plugin.elements) {
      Object.keys(plugin.elements).forEach((type) => {
        const element = plugin.elements[type];
        const nodeType = element.props?.nodeType;

        if (nodeType === 'inline' || nodeType === 'inlineVoid') {
          inlineTopLevelPlugins[type] = element;
        }
      });
    }

    pluginsMap[plugin.type] = plugin;
  });

  plugins.forEach((plugin) => {
    if (plugin.elements) {
      const elements = { ...plugin.elements, ...inlineTopLevelPlugins };
      pluginsMap[plugin.type] = { ...plugin, elements };
    }
  });

  return pluginsMap;
}
