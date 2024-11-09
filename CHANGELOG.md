# Changelog

## [4.9.1] - 2024-10-31

### Added

- `Added supporting highlight colors when serialize/deserialize html`

### Fixed

- `Fixed searching in Action Menu List`
- `Fixed triggering Action Menu List by slash command`
- `Fixed `catastrophic backtracking` for regex url checking. Replaced it with validator-js`
- `Reducing size of `@yoopta/exports``
- `Fixed searching by shortcuts in Action Menu List`
- `Fixed styles for depth when serialize/deserialize html`
- `Fixed example with Medium toolbar`

## [4.9.0] - 2024-10-27

### Breaking Changes

- Changed API for `editor.on('change', changeHandler);`

```javascript
// before
editor.on('change', (value: YooptaChildrenValue) => {
  setValue(value);
});

// now
editor.on('change', (options: YooptaEventChangePayload) => {
  const { value, operations } = options;
  setValue(value);
});

// [!!!But I highly recommend start to use new `onChange` prop in <YooptaEditor value={value} onChange={newValue => setValue(newValue)} />;
```

### Added

> Undo/redo now available!

- New Editor API methods for history:
  - `editor.undo: ({ scroll?: boolean }?: UndoRedoOptions) => void`
  - `editor.redo: ({ scroll?: boolean }?: UndoRedoOptions) => void`
  - `editor.historyStack: Record`
  - `editor.withoutSavingHistory: (fn: () => void): void`
  - `editor.withSavingHistory: (fn: () => void): void`
  - `editor.isSavingHistory: (): boolean | undefined`
  - `editor.withoutMergingHistory: (fn: () => void): void`
  - `editor.withMergingHistory: (fn: () => void): void`
  - `editor.isMergingHistory: (): boolean | undefined`

> New powerful `editor.applyTransforms` method and `operations API.
`Now, every time the content is changed, the corresponding operation is called, which passes through the `editor.applyTransforms`

- `editor.path: YooptaPath`
- `editor.setPath: (path: YooptaPath) => void;`
- `Blocks.getBlock: (editor: YooEditor, options: GetBlockOptions) => YooptaBlockData`
- `Blocks.getBlockSlate: (editor: YooEditor, options: GetBlockSlateOptions) => SlateEditor`
- `Blocks.buildBlockData: (block?: BuildBlockDataOptions) => YooptaBlockData`
- `Blocks.mergeBlock: () => void`

```javascript
export type YooptaPath = {
  current: YooptaPathIndex, // current selected block
  selected?: number[] | null, // array of selected blocks
};
```

### Fixed

- `editor.toggleBlock` -fixed toggling between complex block elements
- `editor.splitBlock` - fixed split between complex block elements
- `onChange` now does not fire during initialization
- `editor.duplicateBlock` - fixed for Code block
- Fixed moving up/down cursor in list plugins
- Fixed trigger of "/" for `ActionMenu`

### Removed

- Editor API changes:
  - `editor.applyChanges` - removed
  - `editor.selection` - removed (changed to `editor.path`)
  - `editor.setSelection` - removed (changed to `editor.setPath`)
  - `editor.setBlockSelected` - removed (changed to `editor.setPath`)
  - `editor.insertBlocks` - removed
  - `editor.deleteBlocks` - removed
  - `editor.createBlock` - removed. Use `editor.insertBlock` instead

### Examples

- Added new example for `operations` API
- Added new example for `undo/redo`
- Updated UI for HTML exports
- Updated UI for Markdown exports
