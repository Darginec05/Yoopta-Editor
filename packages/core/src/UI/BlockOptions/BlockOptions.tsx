import TurnIcon from './icons/turn.svg';
import { TrashIcon, CopyIcon, Link2Icon } from '@radix-ui/react-icons';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { CSSProperties, useState } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  inline,
  autoUpdate,
  FloatingPortal,
  FloatingOverlay,
  useTransitionStyles,
} from '@floating-ui/react';
import copy from 'copy-to-clipboard';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { getRootBlockElement } from '../../utils/blockElements';
import { useYooptaTools } from '../../contexts/YooptaContext/ToolsContext';
import { YooEditor } from '../../editor/types';

const BlockOptionsMenuGroup = ({ children }) => <div className="yoo-editor-flex yoo-editor-flex-col">{children}</div>;

const BlockOptionsMenuContent = ({ children }) => (
  <div
    onClick={(e) => e.stopPropagation()}
    className="yoo-editor-bg-[#FFF] yoo-editor-relative yoo-editor-min-w-[200px] yoo-editor-w-auto yoo-editor-overflow-hidden yoo-editor-rounded-md yoo-editor-border yoo-editor-border-solid yoo-editor-border-[#e5e7eb] yoo-editor-bg-popover yoo-editor-py-[6px] yoo-editor-px-0 yoo-editor-text-popover-foreground yoo-editor-shadow-md data-[state=open]:yoo-editor-animate-in data-[state=closed]:yoo-editor-animate-out data-[state=closed]:yoo-editor-fade-out-0 data-[state=open]:yoo-editor-fade-in-0 data-[state=closed]:yoo-editor-zoom-out-95 data-[state=open]:yoo-editor-zoom-in-95 data-[side=bottom]:yoo-editor-slide-in-from-top-2 data-[side=left]:yoo-editor-slide-in-from-right-2 data-[side=right]:yoo-editor-slide-in-from-left-2 data-[side=top]:yoo-editor-slide-in-from-bottom-2"
  >
    {children}
  </div>
);

const BlockOptionsMenuItem = ({ children }) => (
  <div className="yoo-editor-relative yoo-editor-flex yoo-editor-cursor-default yoo-editor-select-none yoo-editor-items-center yoo-editor-text-sm yoo-editor-outline-none yoo-editor-transition-colors focus:yoo-editor-bg-accent focus:yoo-editor-text-accent-foreground data-[disabled]:yoo-editor-pointer-events-none data-[disabled]:yoo-editor-opacity-50">
    {children}
  </div>
);

type BlockOptionsSeparatorProps = {
  className?: string;
};

const BlockOptionsSeparator = ({ className }: BlockOptionsSeparatorProps) => (
  <div className={`yoo-editor-h-[1px] yoo-editor-bg-[#37352f14] yoo-editor-my-[4px] yoo-editor-w-full ${className}`} />
);

type BlockOptionsProps = {
  isOpen: boolean;
  onClose: () => void;
  refs: any;
  style: CSSProperties;
  children?: React.ReactNode;
};

function filterToggleActions(editor: YooEditor, type: string) {
  const block = editor.blocks[type];
  if (!block) return false;

  const rootBlock = getRootBlockElement(block.elements);
  if (rootBlock?.props?.nodeType === 'void') return false;
  return true;
}

const BlockOptions = ({ isOpen, onClose, refs, style, children }: BlockOptionsProps) => {
  const editor = useYooptaEditor();
  const tools = useYooptaTools();
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const {
    refs: actionMenuRefs,
    floatingStyles: actionMenuFloatingStyles,
    context,
  } = useFloating({
    placement: 'right',
    open: isActionMenuOpen,
    onOpenChange: setIsActionMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: actionMenuTransitionStyles } = useTransitionStyles(context, {
    duration: 100,
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
      editor.emit('block:copy', block);
    }

    onClose();
  };

  const ActionMenu = tools.ActionMenu;
  const actionMenuStyles = { ...actionMenuFloatingStyles, ...actionMenuTransitionStyles };

  const onCloseActionMenu = () => {
    setIsActionMenuOpen(false);
    onClose();
  };

  const getRootProps = () => ({
    'data-action-menu-list': true,
  });

  const getItemProps = (type) => ({
    onMouseEnter: () => undefined,
    'data-action-menu-item': true,
    'data-action-menu-item-type': type,
    'aria-selected': false,
    onClick: () => {
      editor.blocks[type].toggle(type, { focus: true });
      onCloseActionMenu();
    },
  });

  const getActions = () => {
    const items = Object.keys(editor.blocks)
      .filter((type) => filterToggleActions(editor, type))
      .map((action) => {
        const title = editor.blocks[action].options?.display?.title || action;
        const description = editor.blocks[action].options?.display?.description;
        return { type: action, title, description };
      });

    return items;
  };

  const actionMenuRenderProps = {
    actions: getActions(),
    onClose: onCloseActionMenu,
    empty: false,
    getItemProps,
    getRootProps,
    editor,
    view: 'small',
  };

  return (
    // [TODO] - take care about SSR
    <FloatingPortal id="yoo-block-options-portal" root={document.getElementById('yoopta-editor')}>
      <FloatingOverlay lockScroll className="yoo-editor-z-[100]" onClick={onClose}>
        <div style={style} ref={refs.setFloating}>
          <BlockOptionsMenuContent>
            <BlockOptionsMenuGroup>
              <BlockOptionsMenuItem>
                <button
                  type="button"
                  className="yoo-editor-rounded-sm hover:yoo-editor-bg-[#37352f14] yoo-editor-leading-[120%] yoo-editor-px-2 yoo-editor-py-1.5 yoo-editor-mx-[4px] yoo-editor-cursor-pointer yoo-editor-w-full yoo-editor-flex yoo-editor-justify-start"
                  onClick={onDelete}
                >
                  <TrashIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
                  Delete
                </button>
              </BlockOptionsMenuItem>
              <BlockOptionsMenuItem>
                <button
                  type="button"
                  className="yoo-editor-rounded-sm hover:yoo-editor-bg-[#37352f14] yoo-editor-leading-[120%] yoo-editor-px-2 yoo-editor-py-1.5 yoo-editor-mx-[4px] yoo-editor-cursor-pointer yoo-editor-w-full yoo-editor-flex yoo-editor-justify-start"
                  onClick={onDuplicate}
                >
                  <CopyIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
                  Duplicate
                </button>
              </BlockOptionsMenuItem>
              {!isVoidElement && !editor.blocks[currentBlock?.type || '']?.hasCustomEditor && (
                <BlockOptionsMenuItem>
                  {isMounted && !!ActionMenu && (
                    <FloatingPortal id="yoo-block-options-portal" root={document.getElementById('yoopta-editor')}>
                      <FloatingOverlay
                        lockScroll
                        className="yoo-editor-z-[100]"
                        onClick={() => setIsActionMenuOpen(false)}
                      >
                        <div style={actionMenuStyles} ref={actionMenuRefs.setFloating}>
                          <ActionMenu {...actionMenuRenderProps} />
                        </div>
                      </FloatingOverlay>
                    </FloatingPortal>
                  )}
                  <button
                    type="button"
                    className="yoo-editor-rounded-sm hover:yoo-editor-bg-[#37352f14] yoo-editor-leading-[120%] yoo-editor-px-2 yoo-editor-py-1.5 yoo-editor-mx-[4px] yoo-editor-cursor-pointer yoo-editor-w-full yoo-editor-flex yoo-editor-justify-start"
                    ref={actionMenuRefs.setReference}
                    onClick={() => setIsActionMenuOpen((open) => !open)}
                  >
                    <TurnIcon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
                    Turn into
                  </button>
                </BlockOptionsMenuItem>
              )}
              <BlockOptionsMenuItem>
                <button
                  type="button"
                  className="yoo-editor-rounded-sm hover:yoo-editor-bg-[#37352f14] yoo-editor-leading-[120%] yoo-editor-px-2 yoo-editor-py-1.5 yoo-editor-mx-[4px] yoo-editor-cursor-pointer yoo-editor-w-full yoo-editor-flex yoo-editor-justify-start"
                  onClick={onCopy}
                >
                  <Link2Icon className="yoo-editor-w-4 yoo-editor-h-4 yoo-editor-mr-2" />
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
