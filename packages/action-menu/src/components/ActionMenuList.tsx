import { useEffect, useLayoutEffect, useState } from 'react';
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
import {
  YooptaBlockData,
  YooptaBlock,
  useYooptaEditor,
  findSlateBySelectionPath,
  HOTKEYS,
  findPluginBlockBySelectionPath,
} from '@yoopta/editor';
import { ActionMenuToolItem, ActionMenuToolProps } from '../types';

const filterBy = (item: YooptaBlockData | YooptaBlock['options'], text: string, field: string) => {
  if (!item || !item?.[field]) return false;
  return (item[field] as string).toLowerCase().indexOf(text.toLowerCase()) > -1;
};

const filterActionMenuItems = (block: YooptaBlock, text: string) => {
  if (!text) return true;
  return filterBy(block, text, 'type') || filterBy(block.options?.display, text, 'title');
};

// [TODO] - should have default render for prop items
const ActionMenuList = ({ trigger = '/', items, render }: ActionMenuToolProps) => {
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

  // .sort((a: string, b: string) => {
  //   const aOrder = editor.blocks[a]
  //   const bOrder = editor.blocks[b]
  //   return aOrder - bOrder;
  // })
  // [TODO] - add ordering and render specific actions
  const blockTypes: ActionMenuToolItem[] =
    items ||
    Object.keys(editor.blocks).map((type) => ({
      type,
      title: editor.blocks[type].options?.display?.title || type,
      description: editor.blocks[type].options?.display?.description || '',
      icon: editor.blocks[type].options?.display?.icon || '',
    }));

  const [selectedAction, setSelectedAction] = useState<ActionMenuToolItem>(blockTypes[0]);
  const [actions, setActions] = useState<ActionMenuToolItem[]>(blockTypes);

  const onOpen = () => setIsMenuOpen(true);
  const onClose = () => setIsMenuOpen(false);

  const onFilter = ({ text }) => {
    const string = text.trim().replace(trigger, '');

    if (string.length === 0 || string === trigger) return setActions(blockTypes);
    const filteredActions = actions.filter((action) => filterActionMenuItems(editor.blocks[action.type], string));
    const isSelectedItemInsideFilteredActions = filteredActions.some((item) => item.type === selectedAction.type);
    if (filteredActions.length > 0 && !isSelectedItemInsideFilteredActions) setSelectedAction(filteredActions[0]);

    setActions(filteredActions);
  };

  useEffect(() => {
    const yooptaEditorRef = document.getElementById('yoopta-editor');
    updateActionMenuPosition();

    const handleActionMenuKeyUp = (event: KeyboardEvent) => {
      const slate = findSlateBySelectionPath(editor, { at: editor.selection });
      const isInsideEditor = yooptaEditorRef?.contains(event.target as Node);

      if (!slate || !slate.selection || !isInsideEditor) return;

      const parentPath = Path.parent(slate.selection.anchor.path);
      const string = Editor.string(slate, parentPath);

      if (string.length === 0 || !isMenuOpen) return onClose();
      onFilter({ text: string });
    };

    const handleActionMenuKeyDown = (event: KeyboardEvent) => {
      const slate = findSlateBySelectionPath(editor, { at: editor.selection });
      const slateEditorRef = event.currentTarget as HTMLElement;

      const isInsideEditor = slateEditorRef?.contains(event.target as Node);
      const pluginWithCustomEditor = document.querySelector('[data-custom-editor]');
      const isInsideCustomEditor = pluginWithCustomEditor?.contains(event.target as Node);

      if (isInsideCustomEditor || !slate || !slate.selection || !isInsideEditor) return;

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
        const currentSelected = selectedAction || actions[0];
        if (!currentSelected) return;

        const actionKeys = actions.map((item) => item.type);
        const currentIndex = actionKeys.indexOf(currentSelected.type);

        const prevIndex = currentIndex - 1;
        const prevSelected = actions[prevIndex];

        if (!prevSelected) {
          const last = actions[actions.length - 1];
          const lastEl = document.querySelector(`[data-action-menu-item-type="${last.type}"]`) as HTMLElement;
          lastEl.scrollIntoView({ block: 'nearest' });

          return setSelectedAction(last);
        }

        const prevEl = document.querySelector(`[data-action-menu-item-type="${prevSelected.type}"]`) as HTMLElement;
        prevEl.scrollIntoView({ block: 'nearest' });

        return setSelectedAction(prevSelected);
      }

      if (HOTKEYS.isArrowDown(event)) {
        event.preventDefault();
        const currentSelected = selectedAction || actions[0];
        if (!currentSelected) return;

        const actionKeys = actions.map((item) => item.type);
        const currentIndex = actionKeys.indexOf(currentSelected.type);

        const nextIndex = currentIndex + 1;
        const nextSelected = actions[nextIndex];

        if (!nextSelected) {
          const firstEl = document.querySelector(`[data-action-menu-item-type="${actions[0].type}"]`) as HTMLElement;
          firstEl.scrollIntoView({ block: 'nearest' });

          return setSelectedAction(actions[0]);
        }

        const nextEl = document.querySelector(`[data-action-menu-item-type="${nextSelected.type}"]`) as HTMLElement;
        nextEl.scrollIntoView({ block: 'nearest' });

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

    if (editor.selection) {
      const block = findPluginBlockBySelectionPath(editor, { at: editor.selection });
      if (!block) return;

      const slateEditorRef = yooptaEditorRef?.querySelector(`#yoopta-slate-editor-${block.id}`) as HTMLElement;
      if (!slateEditorRef) return;

      slateEditorRef.addEventListener('keydown', handleActionMenuKeyDown);
      slateEditorRef.addEventListener('keyup', handleActionMenuKeyUp);
      return () => {
        slateEditorRef.removeEventListener('keydown', handleActionMenuKeyDown);
        slateEditorRef.removeEventListener('keyup', handleActionMenuKeyUp);
        document.removeEventListener('click', onClose);
      };
    }
  }, [actions, isMenuOpen, editor.selection?.[0]]);

  const onMouseEnter = (e: React.MouseEvent) => {
    const type = e.currentTarget.getAttribute('data-action-menu-item-type')!;
    const action = blockTypes.find((item) => item.type === type)!;
    setSelectedAction(action);
  };

  const empty = actions.length === 0;

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (empty) onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [actions.length, isMenuOpen]);

  if (!isMounted) return null;

  const style = { ...floatingStyles, ...transitionStyles };

  if (render) {
    const getItemProps = () => ({ onMouseEnter, selectedAction });

    return (
      <FloatingPortal id="yoo-action-menu-list-portal" root={document.getElementById('yoopta-editor')}>
        <div
          className="yoo-action-menu-absolute yoo-action-menu-z-[9999] yoo-action-menu-m-0 yoo-action-menu-left-0 yoo-action-menu-top-0 yoo-action-menu-right-auto yoo-action-menu-bottom-auto"
          style={style}
          ref={refs.setFloating}
        >
          {/* [TODO] - pass key down handler */}
          {render({ getItemProps, actions, editor, onMouseEnter, selectedAction, onClose, empty })}
        </div>
      </FloatingPortal>
    );
  }

  return (
    // [TODO] - take care about SSR
    <FloatingPortal id="yoo-action-menu-list-portal" root={document.getElementById('yoopta-editor')}>
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
