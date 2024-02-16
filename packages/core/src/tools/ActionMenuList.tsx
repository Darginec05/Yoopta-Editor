import { createPortal } from 'react-dom';
import { useYooptaEditor } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from './Command';

const ActionMenuList = ({ isOpen, onChangeOpen, style }) => {
  const editor = useYooptaEditor();

  if (!isOpen) return null;

  const positions = { transform: `translate3d(${style?.left}, ${style?.top}, 0)` };

  return createPortal(
    <div className="absolute z-[9999] m-0 left-0 top-0 right-auto bottom-auto" style={positions}>
      <Command>
        <CommandList>
          <CommandGroup heading="Texts">
            {Object.keys(editor.blocks).map((type) => {
              return (
                <CommandItem
                  key={type}
                  onClick={() => {
                    editor.blocks[type].apply({ deleteText: true, focus: true });
                    editor.formats.asdasd;
                    onChangeOpen(false);
                  }}
                >
                  {type}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>,
    document.body,
  );
};

export { ActionMenuList };
