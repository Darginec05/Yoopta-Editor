import { YooEditor, YooptaBlockData } from '../editor/types';
import { Plugin, PluginElement, PluginElementsMap } from '../plugins/types';
import { YooptaMark } from '../marks';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';
import { createBlock } from '../editor/blocks/createBlock';
import { getValue } from '../editor/textFormats/getValue';
import { isActive } from '../editor/textFormats/isActive';
import { toggle } from '../editor/textFormats/toggle';
import { update } from '../editor/textFormats/update';
import { getRootBlockElement } from './blockElements';
import { updateBlock } from '../editor/blocks/updateBlock';
import { toggleBlock, ToggleBlockOptions } from '../editor/blocks/toggleBlock';
import { deleteBlock, DeleteBlockOptions } from '../editor/blocks/deleteBlock';
import { buildSlateEditor } from './buildSlate';

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

export function buildBlocks(editor, plugins: Plugin<string, PluginElement<unknown>>[]) {
  const blocks: YooEditor['blocks'] = {};

  plugins.forEach((plugin) => {
    const rootBlockElement = getRootBlockElement(plugin.elements);
    const nodeType = rootBlockElement?.props?.nodeType;
    const isInline = nodeType === 'inline' || nodeType === 'inlineVoid';

    if (!isInline) {
      const elements = {};
      Object.keys(plugin.elements).forEach((key) => {
        const { render, ...element } = plugin.elements[key];
        elements[key] = element;
      });

      // Omit fetchers and other non-block related options
      const { display, placeholder, shortcuts } = plugin.options || {};

      blocks[plugin.type] = {
        type: plugin.type,
        elements,
        hasCustomEditor: !!plugin.customEditor,
        options: {
          display,
          placeholder,
          shortcuts,
        },
        isActive: () => {
          const block = findPluginBlockBySelectionPath(editor, { at: editor.selection });
          return block?.type === plugin.type;
        },

        // block actions
        toggle: (options?: ToggleBlockOptions) => toggleBlock(editor, plugin.type, options),
        create: (options) => createBlock(editor, plugin.type, options),
        update: <TKeys extends string, TProps>(id: string, data: Partial<Pick<YooptaBlockData, 'meta' | 'value'>>) => {
          updateBlock(editor, id, data);
        },
        delete: (options: DeleteBlockOptions) => {
          deleteBlock(editor, options);
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

// const DEFAULT_PLUGIN_OPTIONS: PluginOptions = {};

export function buildPlugins(
  plugins: Plugin<string, PluginElement<unknown>>[],
): Record<string, Plugin<string, unknown>> {
  const pluginsMap = {};
  const inlineTopLevelPlugins: PluginElementsMap<string, any> = {};

  plugins.forEach((plugin) => {
    if (plugin.elements) {
      Object.keys(plugin.elements).forEach((type) => {
        const element = plugin.elements[type];

        const nodeType = element.props?.nodeType;

        if (nodeType === 'inline' || nodeType === 'inlineVoid') {
          inlineTopLevelPlugins[type] = { ...element, rootPlugin: plugin.type };
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
