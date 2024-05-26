# Core package

This is core package for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/editor
```

### Usage

```tsx
import YooptaEditor, { createYooptaEditor, YooEditor } from '@yoopta/editor';
// plugins
import Paragraph from '@yoopta/paragraph';

const plugins = [Paragraph];

const Editor = () => {
  // create instance
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);

  return <YooptaEditor editor={editor} plugins={plugins} />;
};
```

### YooptaEditor component props

```ts
type Props = {
  /**
   * Instance of editor
   */
  editor: YooEditor;
  /**
   * Optional custom id. Useful for multiple instances
   */
  id?: string;
  /**
   * List of plugins
   */
  plugins: YooptaPlugin[];
  /**
   * List of marks from @yoopta/marks
   */
  marks?: YooptaMark<any>[];
  /**
   * Optional value of editor. DEFAULT - [undefined]
   */
  value?: YooptaContentValue;
  /**
   * Autofocus when editor is ready. DEFAULT - [true]
   */
  autoFocus?: boolean;
  /**
   * Additional className for your needs. DEFAULT - [.yoopta-editor]
   */
  className?: string;
  /**
   * Box for selection area to select by mouse several blocks. DEFAULT - [document]
   */
  selectionBoxRoot?: HTMLElement | React.MutableRefObject<HTMLElement | null> | false;
  children?: React.ReactNode;
  tools?: Partial<Tools>;
  placeholder?: string;
  readOnly?: boolean;
  width?: number | string;
};
```

### API from editor instance

```tsx
type YooEditor<TNodes> = {
  /**
   * Unique identifier for the editor instance.
   */
  id: string;

  /**
   * Inserts a single block of data into the editor.
   */
  insertBlock: (data: YooptaBlockData, options?: YooptaEditorTransformOptions) => void;

  /**
   * Inserts multiple blocks of data into the editor at once.
   */
  insertBlocks: (blocks: YooptaBlockData[], options?: YooptaEditorTransformOptions) => void;

  /**
   * Splits the current block at the cursor's position.
   */
  splitBlock: (options?: YooptaEditorTransformOptions) => void;

  /**
   * Updates a block with new data based on its id.
   */
  updateBlock: (id: string, data: Partial<YooptaBlockData>) => void;

  /**
   * Deletes a block from the editor.
   */
  deleteBlock: (options?: DeleteBlockOptions) => void;

  /**
   * Duplicates a block within the editor.
   */
  duplicateBlock: (options?: DuplicateBlockOptions) => void;

  /**
   * Retrieves a block's data based on provided options.
   */
  getBlock: (options?: YooptaEditorTransformOptions) => void;

  /**
   * Toggles a block's type in the editor.
   */
  toggleBlock: (toBlockType?: string, options?: ToggleBlockOptions) => void;

  /**
   * Increases the depth of a block, typically used for nested structures like lists.
   */
  increaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;

  /**
   * Decreases the depth of a block.
   */
  decreaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;

  /**
   * Applies any staged changes to the editor.
   */
  applyChanges: () => void;

  /**
   * Moves a block to a different position within the editor.
   */
  moveBlock: (blockId: string, to: YooptaBlockPath) => void;

  /**
   * Focuses on a block based on its id.
   */
  focusBlock: (id: string, options?: FocusBlockOptions) => void;

  /**
   * Current selection path in the editor.
   */
  selection: YooptaBlockPath | null;

  /**
   * Array of currently selected block indices.
   */
  selectedBlocks: number[] | null;

  /**
   * Holds the structured data representing the editor's content.
   */
  children: Record<string, YooptaBlockData>;

  /**
   * Retrieves the entire editor's value.
   */
  getEditorValue: () => TNodes;

  /**
   * Sets the editor's content.
   */
  setEditorValue: (value: YooptaContentValue) => void;

  /**
   * Sets the selection path in the editor.
   */
  setSelection: (path: YooptaBlockPath | null, options?: SetSelectionOptions) => void;

  /**
   * Sets or clears the selection for a block.
   */
  setBlockSelected: (path: number[] | null, options?: BlockSelectedOptions) => void;

  /**
   * Map of individual block editors.
   */
  blockEditorsMap: YooptaPluginsEditorMap;

  /**
   * Definitions of all blocks in the editor.
   */
  blocks: YooptaBlocks;

  /**
   * Formatting options available in the editor.
   */
  formats: YooptaFormats;

  /**
   * Keyboard shortcuts configured for the editor.
   */
  shortcuts: Record<string, YooptaBlock>;

  /**
   * Registered plugins.
   */
  plugins: Record<string, Plugin<string, unknown>>;

  /**
   * Subscribes to an event.
   */
  on: (event: YooEditorEvents, fn: (payload: any) => void) => void;

  /**
   * Subscribes once to an event.
   */
  once: (event: YooEditorEvents, fn: (payload: any) => void) => void;

  /**
   * Unsubscribes from an event.
   */
  off: (event: YooEditorEvents, fn: (payload: any) => void) => void;

  /**
   * Emits an event.
   */
  emit: (event: YooEditorEvents, payload: any) => void;

  /**
   * Indicates if the editor is read-only.
   */
  readOnly: boolean;

  /**
   * Returns whether the editor is focused.
   */
  isFocused: () => boolean;

  /**
   * Blurs the editor, removing focus.
   */
  blur: (options?: EditorBlurOptions) => void;

  /**
   * Focuses the editor.
   */
  focus: () => void;
};
```

### Hooks from @yoopta/editor

```ts
/**
 * Hook to access the Yoopta editor instance. Must be used in children components of <YooptaEditor />.
 * @returns {YooEditor} The editor instance.
 */
useYooptaEditor();

/**
 * Hook to check if the editor is in read-only mode.
 * @returns {boolean} True if the editor is read-only.
 */
useYooptaReadOnly();

/**
 * Hook to check if the editor is focused.
 * @returns {boolean} True if the editor is focused.
 */
useYooptaFocused();

/**
 * Hook to get the data for a specific block by its ID.
 * @param {string} blockId The ID of the block.
 * @returns {YooptaBlockData | undefined} The data of the block, or undefined if not found.
 */
useBlockData(blockId);

/**
 * Hook to get the options for a plugin.
 * @template TOptions The type of options expected.
 * @param {string} blockType The block type associated with the plugin.
 * @returns {PluginOptions<TOptions>} The options of the plugin.
 */
useYooptaPluginOptions<TOptions>(blockType);
```
