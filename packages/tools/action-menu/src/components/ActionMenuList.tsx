import { useEffect, useState } from 'react';
import { DefaultActionMenuRender } from './DefaultActionMenuRender';
import { useFloating, offset, flip, shift, inline, autoUpdate, useTransitionStyles } from '@floating-ui/react';
import { Editor, Path } from 'slate';
import {
  YooptaBlockData,
  YooptaBlock,
  useYooptaEditor,
  findSlateBySelectionPath,
  HOTKEYS,
  findPluginBlockBySelectionPath,
  UI,
} from '@yoopta/editor';
import { ActionMenuRenderProps, ActionMenuToolItem, ActionMenuToolProps } from '../types';
import { buildActionMenuRenderProps, mapActionMenuItems } from './utils';

const { Portal } = UI;

const filterBy = (item: YooptaBlockData | YooptaBlock['options'], text: string, field: string) => {
  if (!item || !item?.[field]) return false;
  const itemField = Array.isArray(item[field]) ? item[field].join(' ') : item[field];
  return itemField.toLowerCase().indexOf(text.toLowerCase()) > -1;
};

const filterActionMenuItems = (block: YooptaBlock, text: string) => {
  if (!text) return true;
  return (
    filterBy(block, text, 'type') ||
    filterBy(block.options?.display, text, 'title') ||
    filterBy(block.options, text, 'shortcuts')
  );
};

// [TODO] - add to props
const TRIGGER = '/';

const ActionMenuList = ({ items, render }: ActionMenuToolProps) => {
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

  const blockTypes: ActionMenuToolItem[] = mapActionMenuItems(editor, items || Object.keys(editor.blocks));

  const [selectedAction, setSelectedAction] = useState<ActionMenuToolItem>(blockTypes[0]);
  const [actions, setActions] = useState<ActionMenuToolItem[]>(blockTypes);

  const onOpen = () => setIsMenuOpen(true);
  const onClose = () => setIsMenuOpen(false);

  const onFilter = ({ text }) => {
    const string = text.trim().replace(TRIGGER, '');

    if (string.length === 0 || string === TRIGGER) return setActions(blockTypes);
    const filteredActions = actions.filter((action) => filterActionMenuItems(editor.blocks[action.type], string));
    const isSelectedItemInsideFilteredActions = filteredActions.some((item) => item.type === selectedAction.type);
    if (filteredActions.length > 0 && !isSelectedItemInsideFilteredActions) setSelectedAction(filteredActions[0]);

    setActions(filteredActions);
  };

  useEffect(() => {
    const yooptaEditorRef = document.querySelector(`[data-yoopta-editor-id="${editor.id}"]`);
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

        const menuList = document.querySelector('[data-action-menu-list]');
        const menuListItems = menuList?.querySelectorAll('[data-action-menu-item]');
        if (!menuListItems) return;

        const currentListItem = menuList?.querySelector(`[aria-selected="true"]`) as HTMLElement;
        const currentIndex = Array.from(menuListItems || []).indexOf(currentListItem);

        const prevIndex = currentIndex - 1;
        const prevEl = menuListItems[prevIndex];

        if (!prevEl) {
          const lastEl = menuListItems[menuListItems.length - 1];
          const lastActionType = lastEl.getAttribute('data-action-menu-item-type');
          lastEl.scrollIntoView({ block: 'nearest' });

          const lastAction = actions.find((item) => item.type === lastActionType)!;
          return setSelectedAction(lastAction);
        }

        prevEl.scrollIntoView({ block: 'nearest' });
        const prevActionType = prevEl.getAttribute('data-action-menu-item-type');

        const lastAction = actions.find((item) => item.type === prevActionType)!;
        return setSelectedAction(lastAction);
      }

      if (HOTKEYS.isArrowDown(event)) {
        event.preventDefault();
        const currentSelected = selectedAction || actions[0];
        if (!currentSelected) return;

        const menuList = document.querySelector('[data-action-menu-list]');
        const menuListItems = menuList?.querySelectorAll('[data-action-menu-item]');
        if (!menuListItems) return;

        const currentListItem = menuList?.querySelector(`[aria-selected="true"]`) as HTMLElement;
        const currentIndex = Array.from(menuListItems || []).indexOf(currentListItem);

        const nextIndex = currentIndex + 1;
        const nextEl = menuListItems[nextIndex];

        if (!nextEl) {
          const firstEl = menuListItems[0];
          const firstActionType = firstEl.getAttribute('data-action-menu-item-type');
          firstEl.scrollIntoView({ block: 'nearest' });
          const firstAction = actions.find((item) => item.type === firstActionType)!;

          return setSelectedAction(firstAction);
        }

        nextEl.scrollIntoView({ block: 'nearest' });
        const nextActionType = nextEl.getAttribute('data-action-menu-item-type');

        const nextAction = actions.find((item) => item.type === nextActionType)!;
        return setSelectedAction(nextAction);
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

  const empty = actions.length === 0;

  const onMouseEnter = (e: React.MouseEvent) => {
    const type = e.currentTarget.getAttribute('data-action-menu-item-type')!;
    const action = blockTypes.find((item) => item.type === type)!;
    setSelectedAction(action);
  };

  const renderProps: ActionMenuRenderProps = buildActionMenuRenderProps({
    empty,
    editor,
    onClose,
    onMouseEnter,
    selectedAction,
    view: 'default',
    mode: 'create',
  });

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (empty) onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [actions.length, isMenuOpen]);

  const style = { ...floatingStyles, ...transitionStyles };

  if (render) {
    return (
      // [TODO] - take care about SSR
      <Portal id="yoo-action-menu-list-portal">
        {isMounted && (
          <div className="yoopta-action-menu-list" style={style} ref={refs.setFloating}>
            {/* [TODO] - pass key down handler */}
            {render({ ...renderProps, actions })}
          </div>
        )}
      </Portal>
    );
  }

  return (
    // [TODO] - take care about SSR
    <Portal id="yoo-action-menu-list-portal">
      {isMounted && (
        <div className="yoopta-action-menu-list" style={style} ref={refs.setFloating}>
          <DefaultActionMenuRender {...renderProps} actions={actions} />
        </div>
      )}
    </Portal>
  );
};

export { ActionMenuList };
