import TurnIcon from './icons/turn.svg';
import { TrashIcon, CopyIcon, Link2Icon } from '@radix-ui/react-icons';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { useState } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  inline,
  autoUpdate,
  FloatingPortal,
  FloatingOverlay,
} from '@floating-ui/react';
import copy from 'copy-to-clipboard';
import { ActionMenuComponent } from '../../tools/ActionMenuList/ActionMenuComponent';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { getRootBlockElement } from '../../utils/blockElements';

const BlockOptionsMenuGroup = ({ children }) => <div className="flex flex-col">{children}</div>;

const BlockOptionsMenuContent = ({ children }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="bg-[#FFF] relative min-w-[200px] w-auto overflow-hidden rounded-md border bg-popover py-[6px] px-0 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  >
    {children}
  </div>
);

const BlockOptionsMenuItem = ({ children }) => (
  <div className="relative flex cursor-default select-none items-center text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
    {children}
  </div>
);

type BlockOptionsSeparatorProps = {
  className?: string;
};

const BlockOptionsSeparator = ({ className }: BlockOptionsSeparatorProps) => (
  <div className={`h-[1px] bg-[#37352f14] my-[4px] w-full ${className}`} />
);

const BlockOptions = ({ isOpen, onClose, refs, floatingStyles, children }) => {
  const editor = useYooptaEditor();
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const { refs: actionMenuRefs, floatingStyles: actionMenuFloatingStyles } = useFloating({
    placement: 'right',
    open: isActionMenuOpen,
    onOpenChange: setIsActionMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  if (!isOpen) return null;

  const currentBlock = findPluginBlockBySelectionPath(editor, { at: editor.selection });
  const rootElement = getRootBlockElement(editor.blocks[currentBlock?.type || ''].elements);
  const isVoidElement = rootElement?.props?.nodeType === 'void';

  const onDelete = () => {
    const selection = editor.selection;
    editor.deleteBlock({ at: selection });
    editor.setBlockSelected(null);
    editor.setSelection(null);

    onClose();
  };

  const onDuplicate = () => {
    editor.duplicateBlock({ at: editor.selection, focus: true });
    editor.setBlockSelected(null);

    onClose();
  };

  const onCopy = () => {
    const block = findPluginBlockBySelectionPath(editor);
    if (block) {
      copy(`${window.location.origin}${window.location.pathname}#${block.id}`);
    }

    onClose();
  };

  return (
    // [TODO] - take care about SSR
    <FloatingPortal root={document.getElementById('yoopta-editor')}>
      <FloatingOverlay lockScroll className="z-[100]" onClick={onClose}>
        <div style={floatingStyles} ref={refs.setFloating}>
          <BlockOptionsMenuContent>
            <BlockOptionsMenuGroup>
              <BlockOptionsMenuItem>
                <button
                  type="button"
                  className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
                  onClick={onDelete}
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </BlockOptionsMenuItem>
              <BlockOptionsMenuItem>
                <button
                  type="button"
                  className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
                  onClick={onDuplicate}
                >
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Duplicate
                </button>
              </BlockOptionsMenuItem>
              {!isVoidElement && (
                <BlockOptionsMenuItem>
                  {isActionMenuOpen && (
                    <FloatingPortal root={document.getElementById('yoopta-editor')}>
                      <FloatingOverlay lockScroll className="z-[100]" onClick={() => setIsActionMenuOpen(false)}>
                        <div style={actionMenuFloatingStyles} ref={actionMenuRefs.setFloating}>
                          <ActionMenuComponent
                            actions={Object.keys(editor.blocks)}
                            editor={editor}
                            selectedAction={''}
                            onClose={() => setIsActionMenuOpen(false)}
                            empty={false}
                            onMouseEnter={() => undefined}
                            mode="toggle"
                          />
                        </div>
                      </FloatingOverlay>
                    </FloatingPortal>
                  )}
                  <button
                    type="button"
                    className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
                    ref={actionMenuRefs.setReference}
                    onClick={() => setIsActionMenuOpen((open) => !open)}
                  >
                    <TurnIcon className="w-4 h-4 mr-2" />
                    Turn into
                  </button>
                </BlockOptionsMenuItem>
              )}
              <BlockOptionsMenuItem>
                <button
                  type="button"
                  className="rounded-sm hover:bg-[#37352f14] leading-[120%] px-2 py-1.5 mx-[4px] cursor-pointer w-full flex justify-start"
                  onClick={onCopy}
                >
                  <Link2Icon className="w-4 h-4 mr-2" />
                  Copy link to block
                </button>
              </BlockOptionsMenuItem>
            </BlockOptionsMenuGroup>
            {children}
          </BlockOptionsMenuContent>
        </div>
      </FloatingOverlay>
    </FloatingPortal>
  );
};

export { BlockOptions, BlockOptionsMenuContent, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator };
