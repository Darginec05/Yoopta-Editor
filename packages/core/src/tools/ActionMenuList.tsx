import { createDraft, finishDraft } from 'immer';
import { createPortal } from 'react-dom';
import { Editor } from 'slate';
import { useYooptaEditor } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { YooEditor } from '../editor/types';
import { findPluginBlockBySelectionPath } from '../utils/findPluginBlockBySelectionPath';

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from './Command';

const ActionMenuList = ({ isOpen, onChangeOpen, style }) => {
  const editor = useYooptaEditor();

  if (!isOpen) return null;

  const positions = { transform: `translate3d(${style?.left}, ${style?.top}, 0)` };

  return createPortal(
    <div className="absolute z-[9999] m-0 left-0 top-0 right-auto bottom-auto" style={positions}>
      <Command loop>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Texts">
            {editor.blocks.map((block) => {
              return (
                <CommandItem
                  key={block.type}
                  onClick={() => {
                    console.log('editor.blocks', editor.blocks);
                    console.log('ActionMenuList editor.selection', editor.selection);

                    editor.children = createDraft(editor.children);

                    // [TODO] - check selection path
                    const currentBlock = findPluginBlockBySelectionPath(editor, { at: [2] });

                    if (!currentBlock) return;
                    console.log('currentBlock', Object.assign(currentBlock, {}));

                    const block = editor.blocks[currentBlock.id];
                    console.log('block', block);

                    editor.children = finishDraft(editor.children);
                    editor.applyChanges();
                  }}
                >
                  {block.type}
                </CommandItem>
              );
            })}
          </CommandGroup>

          {/* 
          <CommandGroup heading="Texts">
            <CommandItem
              onClick={() => {
               
              }}
            >
              Heading 1
            </CommandItem>
            <CommandItem>Heading 2</CommandItem>
            <CommandItem>Heading 3</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Voids">
            <CommandItem>Image</CommandItem>
            <CommandItem>Video</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Inlines">
            <CommandItem>Mention</CommandItem>
            <CommandItem>Link</CommandItem>
          </CommandGroup> */}
        </CommandList>
      </Command>
    </div>,
    document.body,
  );
};

export { ActionMenuList };
