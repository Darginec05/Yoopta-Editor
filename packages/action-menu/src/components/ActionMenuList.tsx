import { useEffect, useState } from 'react';
import { DefaultActionMenuRender } from './DefaultActionMenuRender';
import {
  useFloating,
  offset,
  flip,
  shift,
  inline,
  autoUpdate,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react';
import { Editor, Path } from 'slate';
import { YooptaBlockData, YooptaBlock, useYooptaEditor, findSlateBySelectionPath, HOTKEYS } from '@yoopta/editor';

const filterBy = (item: YooptaBlockData | YooptaBlock['options'], text: string, field: string) => {
  if (!item || !item?.[field]) return false;
  return (item[field] as string).toLowerCase().indexOf(text.toLowerCase()) > -1;
};

const filterActionMenuItems = (block: YooptaBlock, text: string) => {
  if (!text) return true;

  return filterBy(block, text, 'type') || filterBy(block.options, text, 'displayLabel');
};

// {
//   id: 'insertImage',
//   title: 'Insert Image',
//   description: 'Insert an image into the text',
//   icon: ImageIcon,
//   handler: () => {},
// }
type Props = {
  trigger?: string;
  actions?: YooptaBlock[];
  render?: (props: any) => JSX.Element;
};

const ActionMenuList = ({ trigger = '/', render }: Props) => {
  const editor = useYooptaEditor();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const {
    refs,
    floatingStyles,
    update: updateActionMenuPosition,
    context,
  } = useFloating({
    placement: 'bottom-start',
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 100,
  });

  const blockTypes = Object.keys(editor.blocks).sort((a: string, b: string) => {
    const aOrder = editor.blocks[a].order;
    const bOrder = editor.blocks[b].order;

    return aOrder - bOrder;
  });

  const [selectedAction, setSelectedAction] = useState(blockTypes[0]);
  const [actions, setActions] = useState(blockTypes);

  const onOpen = () => setIsMenuOpen(true);
  const onClose = () => setIsMenuOpen(false);

  const onFilter = ({ text }) => {
    const string = text.trim().replace(trigger, '');

    if (string.length === 0 || string === trigger) return setActions(blockTypes);
    setActions(blockTypes.filter((type) => filterActionMenuItems(editor.blocks[type], string)));
  };

  useEffect(() => {
    updateActionMenuPosition();

    const yooptaEditorRef = document.getElementById('yoopta-editor');

    const handleActionMenuKeyUp = (event: KeyboardEvent) => {
      const slate = findSlateBySelectionPath(editor, { at: editor.selection });
      const isInsideEditor = yooptaEditorRef?.contains(event.target as Node);

      if (!slate || !slate.selection || !isInsideEditor) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      const string = Editor.string(slate, parentPath);

      if (string.length === 0) return onClose();
      onFilter({ text: string });
    };

    const handleActionMenuKeyDown = (event: KeyboardEvent) => {
      const slate = findSlateBySelectionPath(editor, { at: editor.selection });
      const isInsideEditor = yooptaEditorRef?.contains(event.target as Node);

      if (!slate || !slate.selection || !isInsideEditor) return;

      if (HOTKEYS.isSlashCommand(event)) {
        const parentPath = Path.parent(slate.selection.anchor.path);
        const string = Editor.string(slate, parentPath);
        const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.focus);

        if (!isStart || string.trim().length > 0) return;

        const domSelection = window.getSelection();
        if (!domSelection) return;

        const domRange = domSelection.getRangeAt(0);
        const selectionRect = domRange.getBoundingClientRect();

        if (domRange) {
          refs.setReference({
            getBoundingClientRect: () => selectionRect,
            getClientRects: () => domRange.getClientRects(),
          });

          onOpen();
        }
      }

      if (!isMenuOpen) return;

      if (HOTKEYS.isTab(event)) {
        event.preventDefault();
        return;
      }

      if (HOTKEYS.isArrowUp(event)) {
        event.preventDefault();
        const currentSelected = selectedAction;
        const currentIndex = actions.indexOf(currentSelected);
        const prevIndex = currentIndex - 1;
        const prevSelected = actions[prevIndex];

        if (!prevSelected) {
          return setSelectedAction(blockTypes[blockTypes.length - 1]);
        }

        return setSelectedAction(prevSelected);
      }

      if (HOTKEYS.isArrowDown(event)) {
        event.preventDefault();
        const currentSelected = selectedAction;
        const currentIndex = actions.indexOf(currentSelected);
        const nextIndex = currentIndex + 1;
        const nextSelected = actions[nextIndex];

        if (!nextSelected) {
          return setSelectedAction(blockTypes[0]);
        }

        return setSelectedAction(nextSelected);
      }

      if (HOTKEYS.isArrowLeft(event)) {
        event.preventDefault();
        return;
      }

      if (HOTKEYS.isArrowRight(event)) {
        event.preventDefault();
        return;
      }

      if (HOTKEYS.isBackspace(event)) {
        if (!slate.selection) return;
        const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.focus);
        if (isStart) return onClose();
      }

      if (HOTKEYS.isEscape(event)) {
        event.preventDefault();
        onClose();
        return;
      }

      if (HOTKEYS.isEnter(event)) {
        event.preventDefault();

        const selected = document.querySelector('[data-action-menu-item][aria-selected=true]') as HTMLElement;
        const type = selected?.dataset.actionMenuItemType;
        if (!type) return;

        editor.blocks[type].create({ deleteText: true, focus: true });
        return onClose();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', onClose);
    }

    yooptaEditorRef?.addEventListener('keydown', handleActionMenuKeyDown);
    yooptaEditorRef?.addEventListener('keyup', handleActionMenuKeyUp);
    return () => {
      yooptaEditorRef?.removeEventListener('keydown', handleActionMenuKeyDown);
      yooptaEditorRef?.removeEventListener('keyup', handleActionMenuKeyUp);
      document.removeEventListener('click', onClose);
    };
  }, [actions, isMenuOpen, editor.selection, refs]);

  const onMouseEnter = (e: React.MouseEvent) => {
    const type = e.currentTarget.getAttribute('data-action-menu-item-type')!;
    setSelectedAction(type);
  };

  const empty = actions.length === 0;

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (empty) onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [actions.length, isMenuOpen, refs]);

  if (!isMounted) return null;

  const style = { ...floatingStyles, ...transitionStyles };

  if (render) {
    const getItemProps = (props) => ({ onMouseEnter, selectedAction });

    return (
      <FloatingPortal>
        <div
          className="yoo-action-menu-absolute yoo-action-menu-z-[9999] yoo-action-menu-m-0 yoo-action-menu-left-0 yoo-action-menu-top-0 yoo-action-menu-right-auto yoo-action-menu-bottom-auto"
          style={style}
          ref={refs.setFloating}
        >
          {render({ getItemProps, actions, editor, onMouseEnter, selectedAction, onClose, empty })}
        </div>
      </FloatingPortal>
    );
  }

  return (
    // [TODO] - take care about SSR
    <FloatingPortal root={document.getElementById('yoopta-editor')}>
      <div
        className="yoo-action-menu-absolute yoo-action-menu-z-[9999] yoo-action-menu-m-0 yoo-action-menu-left-0 yoo-action-menu-top-0 yoo-action-menu-right-auto yoo-action-menu-bottom-auto"
        style={style}
        ref={refs.setFloating}
      >
        <DefaultActionMenuRender
          actions={actions}
          editor={editor}
          onMouseEnter={onMouseEnter}
          selectedAction={selectedAction}
          onClose={onClose}
          empty={empty}
        />
      </div>
    </FloatingPortal>
  );
};

export { ActionMenuList };
