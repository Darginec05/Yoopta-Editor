import { HOTKEYS, YoptaComponentType } from '@yopta/editor';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { Element, Editor, Path, Point, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { getRectByCurrentSelection } from '../utils/selectionRect';
import {
  ActionMenuComponentItem,
  ActionMenuRenderItem,
  ActionMenuRenderRootProps,
  ActionRenderItemProps,
  ActionMenuRenderItemProps,
  ActionMenuRenderListProps,
} from '../types';
import { DefaultMenuRender } from './DefaultMenuRender';

const checkIsMenuOpen = (style: CSSProperties) => style.opacity === 1 && !!style.top && !!style.right;

type Props = {
  items: ActionMenuComponentItem[];
  render?: (props: ActionRenderItemProps) => JSX.Element;
  trigger?: string | null;
} & ({ items: ActionMenuComponentItem[]; components?: never } | { components: YoptaComponentType[]; items?: never });

type MenuProps = { style: CSSProperties; point: Point | null };

const MENU_PROPS_VALUE: MenuProps = {
  style: { position: 'fixed', opacity: 0, zIndex: 6, left: -1000, bottom: -1000 },
  point: null,
};

const filterBy = (item: ActionMenuRenderItem, text: string, field: string) =>
  item[field]?.toLowerCase().indexOf(text) > -1;

const ActionMenuList = ({ items, render, components, trigger = '/' }: Props): JSX.Element => {
  const editor = useSlate();
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const elementListRef = useRef<HTMLOListElement>(null);
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

    setMenuProps({
      style: {
        ...menuProps.style,
        left: selectionRect.left,
        top: showAtTop ? selectionRect.top - actionMenuHeight : selectionRect.top + selectionRect.height,
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

    const childNodes = elementListRef.current?.childNodes;
    const firstNodeEl = childNodes?.[0] as HTMLLIElement | undefined;

    if (firstNodeEl?.nodeType === 1) {
      firstNodeEl?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const isMenuOpen = checkIsMenuOpen(menuProps.style);

  const filterInlineNodes = (item: ActionMenuRenderItem) => {
    return !Editor.isInline(editor, { type: item.type, children: [{ text: '' }] });
  };

  const filterMenuList = (item: ActionMenuRenderItem) => {
    const filterText = searchString.replace(trigger || '', '');
    return (
      filterBy(item, filterText, 'type') ||
      filterBy(item, filterText, 'label') ||
      filterBy(item, filterText, 'searchString')
    );
  };

  const renderMenuItems = useMemo<ActionMenuRenderItem[]>(() => {
    let menuList: ActionMenuRenderItem[];

    if (items) {
      menuList = items.map(({ component, ...rest }) => ({ ...component.getComponent, ...rest }));
    } else {
      menuList = (components as unknown as YoptaComponentType[]).filter((item) => !item.isChild);
    }

    return menuList.filter(filterInlineNodes).filter(filterMenuList);
  }, [items, components, searchString]);

  const moveUp = () => {
    const childNodes = elementListRef.current?.childNodes;

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

    setFocusableElement(nextElementIndex);
  };

  const moveDown = () => {
    const childNodes = elementListRef.current?.childNodes;

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

    setFocusableElement(prevElementIndex);
  };

  const handleKeydown = (event) => {
    if (HOTKEYS.isEscape(event)) {
      event.preventDefault();
      return hideActionMenu();
    }

    if (HOTKEYS.isEnter(event)) {
      const selectedNode = renderMenuItems[focusableElement];
      if (selectedNode) changeNode(selectedNode);

      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (HOTKEYS.isTab(event) || HOTKEYS.isArrowDown(event)) {
      event.preventDefault();
      return moveUp();
    }

    if (HOTKEYS.isShiftTab(event) || HOTKEYS.isArrowUp(event)) {
      event.preventDefault();
      return moveDown();
    }
  };

  const handleKeyup = (event) => {
    if (!editor.selection) return;

    const parentPath = Path.parent(editor.selection.anchor.path);
    if (!isMenuOpen && event.key === trigger) {
      event.preventDefault();
      return showActionMenu();
    }

    if (isMenuOpen) {
      const string = Editor.string(editor, parentPath);
      setSearchString(string);
    }
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

    const contentEditor = document.querySelector('#yopta-contenteditable');
    contentEditor?.addEventListener('keyup', handleKeyup);

    if (isMenuOpen) document.addEventListener('keydown', handleKeydown, true);
    return () => {
      clearTimeout(timeout);
      contentEditor?.removeEventListener('keyup', handleKeyup);
      if (isMenuOpen) document.removeEventListener('keydown', handleKeydown, true);
    };
  }, [editor, isMenuOpen, focusableElement, renderMenuItems, render]);

  const changeNode = (menuItem: ActionMenuRenderItem) => {
    Editor.withoutNormalizing(editor, () => {
      if (!editor.selection) return;

      const { offset, path } = editor.selection.anchor;
      Transforms.delete(editor, {
        at: {
          anchor: { path, offset: 0 },
          focus: { path, offset },
        },
      });

      const [parentNode, parentPath] = Editor.parent(editor, Path.parent(editor.selection.anchor.path));

      if (Element.isElement(parentNode) && !Editor.isEditor(parentNode)) {
        Transforms.unwrapNodes(editor, {
          at: parentPath,
          match: (n) => Element.isElement(parentNode) && n.type === parentNode.type,
        });
      }

      menuItem.createNode?.(editor, menuItem.type);
    });
  };

  const getRootProps = (): ActionMenuRenderRootProps => ({
    role: 'dialog',
    'aria-modal': true,
    ref: actionMenuRef,
    style: menuProps.style,
  });

  const getListProps = (): ActionMenuRenderListProps => ({
    ref: elementListRef,
  });

  const getItemsProps = (menuItem: ActionMenuRenderItem, index: number): ActionMenuRenderItemProps => ({
    onMouseDown: () => changeNode(menuItem),
    index,
    focusableElement,
    menuItem,
  });

  const renderProps = { items: renderMenuItems, getRootProps, getListProps, getItemsProps };

  if (render) {
    return render(renderProps);
  }

  return <DefaultMenuRender {...renderProps} />;
};

export { ActionMenuList };
