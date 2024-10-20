import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YooEditor } from '../types';
import { insertBlock } from './insertBlock';

// // Мок для generateId
// vi.mock('./utils', () => ({
//   generateId: () => 'mocked-id',
// }));

// function createTestPlugin(type: string) {
//   return {
//     events: {
//       onBeforeCreate: vi.fn(() => ({ type, children: [{ text: '' }] })),
//       onCreate: vi.fn(),
//     },
//   };
// }

// describe('insertBlock', () => {
//   let editor: YooEditor;

//   beforeEach(() => {
//     editor = {
//       selection: null,
//       children: {},
//       plugins: {
//         paragraph: {
//           events: {
//             onBeforeCreate: vi.fn(() => ({ type: 'paragraph', children: [{ text: '' }] })),
//             onCreate: vi.fn(),
//           },
//         },
//       },
//       applyTransforms: vi.fn(),
//       focusBlock: vi.fn(),
//     } as unknown as YooEditor;
//   });

//   it('should insert a block with default options', () => {
//     const blockId = insertBlock(editor, 'paragraph');

//     expect(blockId).toBe('mocked-id');
//     expect(editor.applyTransforms).toHaveBeenCalledWith([
//       {
//         type: 'insert_block',
//         path: [0],
//         block: {
//           id: 'mocked-id',
//           type: 'paragraph',
//           value: [{ type: 'paragraph', children: [{ text: '' }] }],
//           meta: { align: 'left', depth: 0, order: 0 },
//         },
//       },
//     ]);

//     expect(editor.plugins.paragraph.events.onBeforeCreate).toHaveBeenCalled();
//     expect(editor.plugins.paragraph.events.onCreate).toHaveBeenCalledWith(editor, 'mocked-id');
//   });

//   it('should insert a block at a specified position', () => {
//     editor.children = {
//       'block-1': { meta: { order: 0 } },
//       'block-2': { meta: { order: 1 } },
//     };

//     insertBlock(editor, 'paragraph', { at: [1] });

//     expect(editor.applyTransforms).toHaveBeenCalledWith([
//       {
//         type: 'insert_block',
//         path: [1],
//         block: expect.objectContaining({ meta: { order: 1, align: 'left', depth: 0 } }),
//       },
//     ]);
//   });

//   it('should focus the new block if focus option is true', () => {
//     insertBlock(editor, 'paragraph', { focus: true });

//     expect(editor.focusBlock).toHaveBeenCalledWith('mocked-id');
//   });

//   it('should use provided blockData', () => {
//     const blockData = {
//       id: 'custom-id',
//       value: [{ type: 'custom', children: [{ text: 'Custom text' }] }],
//       meta: { align: 'center', depth: 1 },
//     };

//     insertBlock(editor, 'paragraph', { blockData });

//     expect(editor.applyTransforms).toHaveBeenCalledWith([
//       {
//         type: 'insert_block',
//         path: [0],
//         block: {
//           id: 'custom-id',
//           type: 'paragraph',
//           value: [{ type: 'custom', children: [{ text: 'Custom text' }] }],
//           meta: { align: 'center', depth: 1, order: 0 },
//         },
//       },
//     ]);
//   });

//   it('should call onBeforeCreate and onCreate events', () => {
//     insertBlock(editor, 'paragraph');

//     expect(editor.plugins.paragraph.events.onBeforeCreate).toHaveBeenCalledWith(editor);
//     expect(editor.plugins.paragraph.events.onCreate).toHaveBeenCalledWith(editor, 'mocked-id');
//   });
// });
