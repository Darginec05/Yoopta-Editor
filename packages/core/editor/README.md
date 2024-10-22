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
  /* Width. [Default] - 400px. Will be DEPRECATED, use style object  */
  width?: number | string;
  /* Style CSS Object. [Default] - { width: 400, paddingBottom: 100 }
   */
  style?: number | string;
};
```

### Editor API

```tsx
export type YooEditor<TNodes> = {
  id: string;
  // Method to check if editor is empty
  // [NOTE] - Empty editor means the next: If the Editor has one block with the default type "Paragraph", and this block does not contain text content
  isEmpty: () => boolean;
  readOnly: boolean;
  insertBlock: (data: YooptaBlockData, options?: InsertBlockOptions) => void;
  splitBlock: (options?: SplitBlockOptions) => void;
  updateBlock: (id: string, data: Partial<YooptaBlockData>) => void;
  deleteBlock: (options?: DeleteBlockOptions) => void;
  duplicateBlock: (options: DuplicateBlockOptions) => void;
  toggleBlock: (toBlockType: string, options?: ToggleBlockOptions) => void;
  increaseBlockDepth: (options?: BlockDepthOptions) => void;
  decreaseBlockDepth: (options?: BlockDepthOptions) => void;
  moveBlock: (blockId: string, to: YooptaPath) => void;
  focusBlock: (id: string, options?: FocusBlockOptions) => void;
  getBlock: (options: GetBlockOptions) => YooptaBlockData | null;
  selectedBlocks: number[] | null;
  children: Record<string, YooptaBlockData>;
  getEditorValue: () => TNodes;
  setEditorValue: (value: YooptaContentValue) => void;
  path: YooptaPath;
  setPath: (path: YooptaPath | null, options?: SetSelectionOptions) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  blocks: YooptaBlocks;
  formats: YooptaFormats;
  shortcuts: Record<string, YooptaBlock>;
  plugins: Record<string, Plugin<string, unknown>>;

  // events handlers
  on: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  once: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  off: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  emit: (event: YooEditorEvents, payload: any) => void;

  // focus handlers
  isFocused: () => boolean;
  blur: (options?: EditorBlurOptions) => void;
  focus: () => void;

  // parser handlers
  getHTML: (content: YooptaContentValue) => string;
  getMarkdown: (content: YooptaContentValue) => string;
  getPlainText: (content: YooptaContentValue) => string;

  // ref to editor element
  refElement: HTMLElement | null;
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
