import { createPortal } from 'react-dom';
import { TextIcon } from '@radix-ui/react-icons';
import { useYooptaEditor } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { CSSProperties, useEffect, useState } from 'react';
import { YooEditor, YooptaBlock } from '../editor/types';
import { Editor, Path } from 'slate';
import { HOTKEYS } from '../utils/hotkeys';
import { useTools } from '../contexts/UltraYooptaContext/ToolsContext';

export const handleActionMenuKeyDown =
  (editor: YooEditor, slate: Editor, { onOpen, onClose, state }) =>
  (event: React.KeyboardEvent) => {
    console.log('HOTKEYS.isEscape(event)', HOTKEYS.isEscape(event));
    console.log('state', state);

    if (HOTKEYS.isSlashCommand(event)) {
      if (!slate.selection) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      const string = Editor.string(slate, parentPath);
      const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.focus);

      if (!isStart || string.trim().length > 0) return;

      const domSelection = window.getSelection();
      if (!domSelection) return;

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const style = {
        top: `${rect.top + window.scrollY + rect.height + 5}px`,
        left: `${rect.left + window.scrollX}px`,
      };

      onOpen({
        open: true,
        style,
      });
    }

    if (!state?.open) return;

    if (HOTKEYS.isTab(event)) {
      event.preventDefault();
      return;
    }

    if (HOTKEYS.isArrowDown(event)) {
      event.preventDefault();
      return;
    }

    if (HOTKEYS.isArrowUp(event)) {
      event.preventDefault();
      return;
    }

    if (HOTKEYS.isEscape(event)) {
      event.preventDefault();
      onClose();
      return;
    }

    if (HOTKEYS.isEnter(event)) {
      event.preventDefault();
      return;
    }
  };

export const handleActionMenuKeyUp =
  (editor: YooEditor, slate: Editor, { onOpen, onClose, onChange, state }) =>
  (event: React.KeyboardEvent) => {
    if (!slate.selection) return;

    const parentPath = Path.parent(slate.selection.anchor.path);
    const string = Editor.string(slate, parentPath);
    onChange({ text: string });
  };

const filterBy = (item: YooptaBlock | YooptaBlock['options'], text: string, field: string) => {
  if (!item || !item?.[field]) return false;
  return (item[field] as string).toLowerCase().indexOf(text) > -1;
};

const filterActionMenuItems = (block: YooptaBlock, text: string) => {
  if (!text) return true;

  return filterBy(block, text, 'type') || filterBy(block.options, text, 'displayLabel');
};

type Props = {
  trigger?: string;
  // {
  //   id: 'insertImage',
  //   title: 'Insert Image',
  //   description: 'Insert an image into the text',
  //   icon: ImageIcon,
  //   handler: () => { /* Функция для вставки изображения */ },
  // }
  actions?: YooptaBlock[];
  render?: (props: any) => JSX.Element;
};

const ActionMenuList = ({ trigger = '/' }: Props) => {
  const editor = useYooptaEditor();
  const { registerTool, unregisterTool } = useTools();

  const blockKeys = Object.keys(editor.blocks).sort((a, b) => {
    const aOrder = editor.blocks[a].order;
    const bOrder = editor.blocks[b].order;

    return aOrder - bOrder;
  });

  const [actions, setActions] = useState(blockKeys);
  const [state, setState] = useState({
    open: false,
    style: {} as CSSProperties,
  });

  const { open: isOpen, style } = state;

  const onOpen = ({ style }) => setState({ open: true, style });
  const onClose = () => setState({ open: false, style: {} });

  const onFilter = ({ text }) => {
    const string = text.trim().replace(trigger, '');

    if (string.length === 0 || string === trigger) return setActions(blockKeys);
    setActions(blockKeys.filter((type) => filterActionMenuItems(editor.blocks[type], string)));
  };

  useEffect(() => {
    registerTool('actionMenu', {
      onOpen,
      onClose: onClose,
      onChange: onFilter,
      state,
      events: { onKeyDown: handleActionMenuKeyDown, onKeyUp: handleActionMenuKeyUp },
    });
    return () => unregisterTool('actionMenu');
  }, [state]);

  const onMouseEnter = () => {};
  const onMouseLeave = () => {};
  const selectedIndex = 0;

  const isEmpty = actions.length === 0;
  const positions = { transform: `translate3d(${style?.left}, ${style?.top}, 0)` };

  if (!isOpen) return null;

  return createPortal(
    <div className="absolute z-[9999] m-0 left-0 top-0 right-auto bottom-auto" style={positions}>
      <div className="bg-white z-50 h-auto max-h-[330px] max-w-[250px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 transition-all shadow-md">
        <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          <div data-action-menu-list className="overflow-hidden p-0 text-foreground">
            {actions.map((type, i) => {
              const block = editor.blocks[type];
              return (
                <button
                  key={type}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  aria-selected={i === selectedIndex}
                  data-action-menu-item
                  data-action-menu-item-type={type}
                  onClick={() => {
                    editor.blocks[type].apply({ deleteText: true, focus: true });
                    onClose();
                  }}
                  className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-1 py-1 mb-0.5 text-left text-sm hover:bg-[#f4f4f5] aria-selected:bg-[#f0f0f0]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-white">
                    <TextIcon />
                  </div>
                  <div>
                    <div className="font-medium ">{block.options?.displayLabel || block.type}</div>
                    <div className="text-xs text-muted-foreground">Description</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export { ActionMenuList };
