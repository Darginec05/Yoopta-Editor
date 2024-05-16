import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  UnderlineIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { useFloating, offset, flip, shift, inline, autoUpdate } from '@floating-ui/react';
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from 'react';
import { HighlightColor } from './HighlightColor';
import { findSlateBySelectionPath, HOTKEYS, SlateElement, useYooptaTools, UI } from '@yoopta/editor';
import { Editor, Element, NodeEntry, Range, Transforms } from 'slate';
import { ToolbarRenderProps } from '../types';
import { buildActionMenuRenderProps } from './utils';

const { Overlay, Portal } = UI;

type LinkValues = {
  title?: string;
  url: string;
  target?: string;
  rel?: string;
};

const DEFAULT_LINK_VALUE: LinkValues = {
  title: '',
  url: '',
  target: '_blank',
  rel: 'noreferrer',
};

const getLinkEntry = (slate) => {
  const [link] = Editor.nodes(slate, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && (n as SlateElement).type === 'link',
  });

  return link;
};

const DEFAULT_MODALS = { link: false, highlight: false, actionMenu: false };
type ModalsState = typeof DEFAULT_MODALS;

const DefaultToolbarRender = ({ activeBlock, editor, toggleHoldToolbar }: ToolbarRenderProps) => {
  const [modals, setModals] = useState<ModalsState>({ link: false, highlight: false, actionMenu: false });
  const [linkValues, setLinkValues] = useState<LinkValues>(DEFAULT_LINK_VALUE);
  const lastSelection = useRef<Range | null>(null);

  const tools = useYooptaTools();

  const onChangeModal = (modal: keyof ModalsState, value: boolean) => {
    setModals(() => ({ ...DEFAULT_MODALS, [modal]: value }));
  };

  const { refs: actionMenuRefs, floatingStyles: actionMenuStyles } = useFloating({
    placement: 'bottom-start',
    open: modals.actionMenu,
    onOpenChange: (open) => onChangeModal('actionMenu', open),
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { refs: highlightPickerRefs, floatingStyles: highlightPickerStyles } = useFloating({
    placement: 'top-end',
    open: modals.highlight,
    onOpenChange: (open) => onChangeModal('highlight', open),
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { refs: linkToolRefs, floatingStyles: linkToolStyles } = useFloating({
    placement: 'top-start',
    open: modals.link,
    onOpenChange: (open) => onChangeModal('link', open),
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const getItemStyle = (type) => ({
    backgroundColor: editor.formats[type]?.isActive() ? '#1183ff' : undefined,
    color: editor.formats[type]?.isActive() ? '#fff' : undefined,
  });

  const highlight = editor.formats.highlight;
  const highlightColors = highlight?.getValue();
  const getHighlightTriggerStyle = (): CSSProperties => {
    const buttonStyles = getModalTriggerStyle('highlight');

    return {
      color: highlightColors?.color,
      backgroundColor: buttonStyles.backgroundColor || highlightColors?.backgroundColor,
      backgroundImage: highlightColors?.backgroundImage,
      WebkitTextFillColor: highlightColors?.webkitTextFillColor,
    };
  };

  const blockLabel = activeBlock?.options?.display?.title || activeBlock?.type || '';

  const ActionMenu = tools.ActionMenu;
  const LinkTool = tools.LinkTool;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (HOTKEYS.isEscape(e)) {
        setModals(DEFAULT_MODALS);
        toggleHoldToolbar?.(false);
        return;
      }

      // [TODO]: Implement this accessibility feature
      // if (HOTKEYS.isEnter(e)) {
      //   if (modals.link) {
      //     onUpdateLink(linkValues);
      //   }
      // }
    };

    if (modals.link) {
      const slate = findSlateBySelectionPath(editor);
      if (!slate || !slate.selection) return;

      lastSelection.current = slate.selection;

      const title = Editor.string(slate, slate?.selection);
      const linkNodeEntry = getLinkEntry(slate);

      if (linkNodeEntry) {
        const [linkNode] = linkNodeEntry as NodeEntry<SlateElement>;
        setLinkValues({ ...linkNode.props, title });
      } else {
        setLinkValues({ ...linkValues, title });
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [editor.selection, editor.children, modals.link]);

  const onUpdateLink = (link: LinkValues) => {
    const slate = findSlateBySelectionPath(editor);
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      if (!slate.selection) return;

      const linkNodeEntry = getLinkEntry(slate);

      if (linkNodeEntry) {
        const [linkNode] = linkNodeEntry as NodeEntry<SlateElement>;
        const updatedNode = { props: { ...linkNode?.props, ...link } };

        Transforms.setNodes<SlateElement>(slate, updatedNode, {
          match: (n) => Element.isElement(n) && (n as SlateElement).type === 'link',
        });

        Editor.insertText(slate, link.title || link.url, { at: slate.selection });
        Transforms.collapse(slate, { edge: 'end' });
      } else {
        const linkNode = {
          type: 'link',
          children: [{ text: link.title }],
          props: { ...link, nodeType: 'inline' },
        } as SlateElement;

        Transforms.wrapNodes(slate, linkNode, { split: true, at: slate.selection });
        Transforms.setNodes(
          slate,
          { text: link.title },
          {
            at: slate.selection,
            mode: 'lowest',
            match: (n) => !Editor.isEditor(n) && Element.isElement(n) && (n as SlateElement).type === 'link',
          },
        );

        Editor.insertText(slate, link.title || link.url, { at: slate.selection });
        Transforms.collapse(slate, { edge: 'end' });
      }

      editor.applyChanges();
      editor.emit('change', editor.children);

      onChangeModal('link', false);
      setLinkValues(DEFAULT_LINK_VALUE);
      toggleHoldToolbar?.(false);

      // if (lastSelection.current) {
      //   try {
      //     Transforms.select(slate, lastSelection.current);
      //     Transforms.setSelection(slate, lastSelection.current);
      //     lastSelection.current = null;
      //   } catch (error) {}
      // }
    });
  };

  const onDeleteLink = () => {
    const slate = findSlateBySelectionPath(editor);
    if (!slate || !slate.selection) return;
    const linkNodeEntry = getLinkEntry(slate);
    if (linkNodeEntry) {
      Transforms.unwrapNodes(slate, {
        match: (n) => !Editor.isEditor(n) && Element.isElement(n) && (n as SlateElement).type === 'link',
      });
    }
    onChangeModal('link', false);
    setLinkValues(DEFAULT_LINK_VALUE);
    toggleHoldToolbar?.(false);
  };

  const onClickLinkOverlay = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (linkToolRefs.floating.current?.contains(e.target as Node)) return;

    toggleHoldToolbar?.(false);
    setModals(DEFAULT_MODALS);
  };

  const isActiveTriggerModal = (modal: keyof ModalsState) => modals[modal];
  const getModalTriggerStyle = (modal: keyof ModalsState) => ({
    backgroundColor: isActiveTriggerModal(modal) ? '#f4f4f5' : undefined,
  });

  const onToggleMark = (format: string) => {
    setModals(DEFAULT_MODALS);
    editor.formats[format].toggle();
  };

  const onCloseActionMenu = () => onChangeModal('actionMenu', false);

  const actionMenuRenderProps = buildActionMenuRenderProps({ editor, onClose: onCloseActionMenu, view: 'small' });

  return (
    <Toolbar.Root className="yoo-toolbar-bg-[#FFFFFF] yoo-toolbar-flex yoo-toolbar-z-50 yoo-toolbar-p-[5px] yoo-toolbar-rounded-md yoo-toolbar-shadow-md yoo-toolbar-border-[1px] yoo-toolbar-border-solid yoo-toolbar-border-[#e3e3e3] yoo-toolbar-shadow-y-[4px]">
      <Toolbar.ToggleGroup
        className="yoo-toolbar-flex yoo-toolbar-items-center"
        type="single"
        aria-label="Block formatting"
      >
        <Toolbar.ToggleItem
          className="yoopta-button yoo-toolbar-h-full yoo-toolbar-text-[16px] yoo-toolbar-px-[10px] yoo-toolbar-py-0 hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md"
          value={blockLabel}
          aria-label={blockLabel}
          ref={actionMenuRefs.setReference}
          onClick={() => onChangeModal('actionMenu', !modals.actionMenu)}
          style={getModalTriggerStyle('actionMenu')}
        >
          <span className="yoo-toolbar-mr-0">{blockLabel}</span>
          {modals.actionMenu && !!ActionMenu && (
            <Portal id="yoo-toolbar-action-menu-list-portal">
              <div style={actionMenuStyles} ref={actionMenuRefs.setFloating} onClick={(e) => e.stopPropagation()}>
                <ActionMenu {...actionMenuRenderProps} />
              </div>
            </Portal>
          )}
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="yoo-toolbar-bg-[#dbd8e0] yoo-toolbar-mx-[6px] yoo-toolbar-my-0 yoo-toolbar-w-[1px]" />
      <Toolbar.ToggleGroup
        className="yoo-toolbar-flex yoo-toolbar-items-center"
        type="single"
        aria-label="Block formatting"
      >
        <Toolbar.ToggleItem
          className="yoopta-button yoo-toolbar-h-full yoo-toolbar-text-[16px] yoo-toolbar-px-[10px] yoo-toolbar-py-0 hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md"
          value="LinkTool"
          aria-label="LinkTool"
          ref={linkToolRefs.setReference}
          onClick={() => {
            onChangeModal('link', !modals.link);
            toggleHoldToolbar?.(true);
          }}
          style={getModalTriggerStyle('link')}
        >
          <span className="yoo-toolbar-mr-0">Link</span>
          {modals.link && !!LinkTool && (
            <Portal id="yoo-link-tool-portal">
              <Overlay lockScroll className="z-[100]" onClick={onClickLinkOverlay}>
                <div style={linkToolStyles} ref={linkToolRefs.setFloating}>
                  <LinkTool link={linkValues} onSave={onUpdateLink} onDelete={onDeleteLink} />
                </div>
              </Overlay>
            </Portal>
          )}
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="yoo-toolbar-bg-[#dbd8e0] yoo-toolbar-mx-[6px] yoo-toolbar-my-0 yoo-toolbar-w-[1px]" />
      <Toolbar.ToggleGroup
        className="yoo-toolbar-flex yoo-toolbar-items-center"
        type="multiple"
        aria-label="Text formatting"
      >
        {editor.formats.bold && (
          <Toolbar.ToggleItem
            className="yoopta-button yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="bold"
            aria-label="Bold"
            style={getItemStyle('bold')}
            onClick={() => onToggleMark('bold')}
          >
            <FontBoldIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.italic && (
          <Toolbar.ToggleItem
            className="yoopta-button yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="italic"
            aria-label="Italic"
            style={getItemStyle('italic')}
            onClick={() => onToggleMark('italic')}
          >
            <FontItalicIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.underline && (
          <Toolbar.ToggleItem
            className="yoopta-button yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="underline"
            aria-label="Underline"
            style={getItemStyle('underline')}
            onClick={() => onToggleMark('underline')}
          >
            <UnderlineIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.strike && (
          <Toolbar.ToggleItem
            className="yoopta-button yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="strike"
            aria-label="Strike"
            style={getItemStyle('strike')}
            onClick={() => onToggleMark('strike')}
          >
            <StrikethroughIcon width={20} height={20} />
            {/* <span className="yoo-toolbar-w-[20px] yoo-toolbar-h-[20px] yoo-toolbar-line-through">S</span> */}
          </Toolbar.ToggleItem>
        )}
        {editor.formats.code && (
          <Toolbar.ToggleItem
            className="yoopta-button yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="code"
            aria-label="Code"
            style={getItemStyle('code')}
            onClick={() => onToggleMark('code')}
          >
            <CodeIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.highlight && (
          <>
            {modals.highlight && (
              <HighlightColor
                editor={editor}
                floatingStyles={highlightPickerStyles}
                refs={highlightPickerRefs}
                onClose={() => onChangeModal('highlight', false)}
                highlightColors={highlightColors}
              />
            )}

            <Toolbar.ToggleItem
              className="yoopta-button yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
              value="highlight"
              aria-label="Highlight"
              style={getHighlightTriggerStyle()}
              ref={highlightPickerRefs.setReference}
              onClick={() => onChangeModal('highlight', !modals.highlight)}
            >
              <span className="yoo-toolbar-text-lg yoo-toolbar-px-1 yoo-toolbar-font-serif yoo-toolbar-text-col">
                A
              </span>
              {modals.highlight ? <ChevronUpIcon width={10} /> : <ChevronDownIcon width={10} />}
            </Toolbar.ToggleItem>
          </>
        )}
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { DefaultToolbarRender };
