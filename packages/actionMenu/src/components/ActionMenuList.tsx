import { HOTKEYS, YoEditor, YooptaBaseElement, YooptaPluginType, useElements } from '@yoopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Element, Editor, Path, Point, Transforms, Text } from 'slate';
import { useSlate } from 'slate-react';
import { getRectByCurrentSelection } from '../utils/selectionRect';
import {
  ActionMenuItem,
  ActionMenuRenderItem,
  ActionMenuRenderRootProps,
  ActionMenuRenderProps,
  ActionMenuRenderItemProps,
  Groups,
} from '../types';
import { DefaultMenuRender } from './DefaultMenuRender';
import s from './DefaultMenuRender.module.scss';

const checkIsMenuOpen = (style: CSSProperties) => style.opacity === 1 && !!style.top && !!style.right;

type Props = {
  items?: ActionMenuItem<Record<string, unknown>>[];
  render?: (props: ActionMenuRenderProps) => JSX.Element;
  trigger?: string | null | ((event: KeyboardEvent) => boolean);
} & (
  | { items?: ActionMenuItem<Record<string, unknown>>[]; plugins?: YooptaPluginType[] }
  | { plugins: YooptaPluginType[]; items?: never }
);

type MenuProps = { fixedStyle: CSSProperties; absoluteStyle: CSSProperties; point: Point | null };

const MENU_PROPS_VALUE: MenuProps = {
  fixedStyle: { position: 'fixed', opacity: 0, zIndex: 6, left: -1000, bottom: -1000 },
  absoluteStyle: { left: 0, bottom: 0, top: 'auto', right: 'auto' },
  point: null,
};

const filterBy = (item: ActionMenuRenderItem, text: string, field: string) => {
  if (!item[field]) return false;
  return (item[field] as string).toLowerCase().indexOf(text) > -1;
};

const ACTION_MENU_ITEM_DATA_ATTR = 'data-action-menu-item';

const ActionMenuList = ({ items, render, plugins, trigger = '/' }: Props): JSX.Element => {
  const editor = useSlate() as YoEditor;
  const elements = useElements();
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const [menuProps, setMenuProps] = useState<MenuProps>(MENU_PROPS_VALUE);
  const [searchString, setSearchString] = useState('');
  const [focusableElement, setFocusableElement] = useState(0);

  const showActionMenu = () => {
    if (!editor.selection) return;

    const selectionRect = getRectByCurrentSelection();
    const actionMenuHeight = actionMenuRef.current!.clientHeight;

    const showAtTop = selectionRect.top + selectionRect.height + actionMenuHeight > window.innerHeight;

    disableBodyScroll(document.body, { reserveScrollBarGap: true });
    const parentPath = Path.parent(editor.selection.anchor.path);

    const absoluteStyle = showAtTop
      ? { left: 0, bottom: 5, top: 'auto', right: 'auto' }
      : { left: 0, bottom: 'auto', top: selectionRect.height + 5, right: 'auto' };

    setMenuProps({
      absoluteStyle,
      fixedStyle: {
        ...menuProps.fixedStyle,
        left: selectionRect.left,
        top: selectionRect.top,
        right: 'auto',
        bottom: 'auto',
        opacity: 1,
        position: 'fixed',
      },
      point: { path: parentPath, offset: editor.selection.anchor.offset },
    });
  };

  const hideActionMenu = () => {
    enableBodyScroll(document.body);
    setMenuProps(MENU_PROPS_VALUE);
    setSearchString('');
    setFocusableElement(0);

    const childNodes = document.querySelectorAll(`[${ACTION_MENU_ITEM_DATA_ATTR}]`);
    childNodes.forEach((childNode) => childNode?.setAttribute('aria-selected', 'false'));

    const firstNodeEl = childNodes?.[0] as HTMLLIElement | undefined;
    firstNodeEl?.setAttribute('aria-selected', 'true');

    if (firstNodeEl?.nodeType === 1) {
      firstNodeEl?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const isMenuOpen = checkIsMenuOpen(menuProps.fixedStyle);

  const filterMenuList = (item: ActionMenuRenderItem) => {
    let filterText = searchString;

    if (typeof trigger === 'string') {
      filterText = searchString.replace(trigger || '', '');
    }

    return (
      filterBy(item, filterText, 'type') ||
      filterBy(item, filterText, 'label') ||
      filterBy(item, filterText, 'searchString')
    );
  };

  const mapCustomMenuItems = (item: ActionMenuItem<Record<string, unknown>>) => {
    const { plugin, ...rest } = item;
    const { type, createElement, defineElement } = plugin.getPlugin;

    return { ...rest, type, createElement, defineElement };
  };

  const renderMenuItems = useMemo<ActionMenuRenderItem[]>(() => {
    let menuList: ActionMenuRenderItem[];

    if (items) {
      menuList = items.map(mapCustomMenuItems);
    } else {
      menuList = (plugins as YooptaPluginType[])
        .filter((item) => !item.hasParent)
        .map((item) => ({ type: item.type, createElement: item.createElement, defineElement: item.defineElement }));
    }

    return menuList.filter(filterMenuList);
  }, [items, plugins, searchString]);

  const groupRenderItems = useMemo<Groups>(() => {
    const groups: Groups = { texts: [], voids: [], inlines: [] };

    renderMenuItems.forEach((plugin) => {
      const element = plugin.defineElement();
      if (editor.isVoid(element)) groups.voids.push(plugin);
      else if (editor.isInline(element)) groups.inlines.push(plugin);
      else groups.texts.push(plugin);
    });

    return groups;
  }, [renderMenuItems]);

  const moveDown = () => {
    const childNodes = document.querySelectorAll(`[${ACTION_MENU_ITEM_DATA_ATTR}]`);
    const currentNodeEl = childNodes?.[focusableElement] as HTMLLIElement | undefined;
    currentNodeEl?.setAttribute('aria-selected', 'false');

    let nextElementIndex = focusableElement + 1;
    const isLast = nextElementIndex === childNodes?.length;
    if (isLast) nextElementIndex = 0;

    const selectedNodeEl = childNodes?.[nextElementIndex] as HTMLLIElement | undefined;

    if (selectedNodeEl?.nodeType === 1) {
      selectedNodeEl?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    selectedNodeEl?.setAttribute('aria-selected', 'true');
    setFocusableElement(nextElementIndex);
  };

  const moveUp = () => {
    const childNodes = document.querySelectorAll(`[${ACTION_MENU_ITEM_DATA_ATTR}]`);
    const currentNodeEl = childNodes?.[focusableElement] as HTMLLIElement | undefined;
    currentNodeEl?.setAttribute('aria-selected', 'false');

    let prevElementIndex = focusableElement - 1;
    const isFirst = focusableElement === 0;

    if (isFirst) prevElementIndex = childNodes!.length - 1;
    const selectedNodeEl = childNodes?.[prevElementIndex] as HTMLLIElement | undefined;

    if (selectedNodeEl?.nodeType === 1) {
      selectedNodeEl?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    selectedNodeEl?.setAttribute('aria-selected', 'true');
    setFocusableElement(prevElementIndex);
  };

  const handleKeydown = (event) => {
    if (HOTKEYS.isEscape(event)) {
      event.preventDefault();
      return hideActionMenu();
    }

    if (HOTKEYS.isEnter(event)) {
      const childNodes = document.querySelectorAll(`[${ACTION_MENU_ITEM_DATA_ATTR}]`);
      const selectedType = childNodes[focusableElement]?.getAttribute('data-element-type') as string;

      if (!selectedType) return;

      toggleElement(selectedType);

      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (HOTKEYS.isTab(event) || HOTKEYS.isArrowDown(event)) {
      event.preventDefault();
      return moveDown();
    }

    if (HOTKEYS.isShiftTab(event) || HOTKEYS.isArrowUp(event)) {
      event.preventDefault();
      return moveUp();
    }
  };

  const handleKeyup = (event) => {
    if (!editor.selection || !trigger) return;

    const parentPath = Path.parent(editor.selection.anchor.path);
    const string = Editor.string(editor, parentPath);

    if (typeof trigger === 'function' && trigger(event)) {
      event.preventDefault();
      return showActionMenu();
    }

    if (!isMenuOpen && string === trigger && string.includes(event.key)) {
      event.preventDefault();
      return showActionMenu();
    }

    if (isMenuOpen) return setSearchString(string);
  };

  useEffect(() => {
    if (!editor.selection || !menuProps.point) return hideActionMenu();

    const parentPath: Path = Path.parent(editor.selection.anchor.path);
    const selectionPoint: Point = { path: parentPath, offset: editor.selection.anchor.offset };

    if (!Path.equals(selectionPoint.path, menuProps.point.path) || Point.isBefore(selectionPoint, menuProps.point)) {
      hideActionMenu();
    }
  }, [editor.selection, menuProps.point]);

  const isNotFound = renderMenuItems.length === 0;

  useEffect(() => {
    let timeout;

    if (isNotFound) {
      timeout = setTimeout(() => {
        hideActionMenu();
      }, 1500);
    }

    if (focusableElement > renderMenuItems.length - 1) setFocusableElement(0);

    const contentEditor = document.querySelector('#yoopta-contenteditable');
    contentEditor?.addEventListener('keyup', handleKeyup);

    if (isMenuOpen) document.addEventListener('keydown', handleKeydown, true);
    return () => {
      clearTimeout(timeout);
      contentEditor?.removeEventListener('keyup', handleKeyup);
      if (isMenuOpen) document.removeEventListener('keydown', handleKeydown, true);
    };
  }, [editor, isMenuOpen, focusableElement, renderMenuItems]);

  const toggleElement = (type: string) => {
    const menuItem = renderMenuItems.find((item) => item.type === type);
    if (!menuItem) return;
    elements[type]?.toggle({ shouldDeleteText: true });
  };

  const getRootProps = (): ActionMenuRenderRootProps => ({
    ref: actionMenuRef,
  });

  const getItemProps = (type: string): ActionMenuRenderItemProps => ({
    onClick: () => toggleElement(type),
    [ACTION_MENU_ITEM_DATA_ATTR]: true,
    'aria-selected': false,
    'data-element-type': type,
  });

  const renderProps: ActionMenuRenderProps = {
    items: renderMenuItems,
    groups: groupRenderItems,
    isNotFound,
    getRootProps,
    getItemProps,
  };

  if (typeof render === 'function') {
    return (
      <div role={'dialog'} aria-modal style={menuProps.fixedStyle}>
        <div className={s.relative}>
          <div className={s.absolute} style={menuProps.absoluteStyle}>
            {render(renderProps)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div role={'dialog'} aria-modal style={menuProps.fixedStyle}>
      <div className={s.relative}>
        <div className={s.absolute} style={menuProps.absoluteStyle}>
          <DefaultMenuRender {...renderProps} />
        </div>
      </div>
    </div>
  );
};

export { ActionMenuList };
