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
import { useFloating, offset, flip, shift, inline, autoUpdate, FloatingPortal } from '@floating-ui/react';
import { CSSProperties, useEffect, useState } from 'react';
import { HighlightColor } from './HighlightColor';
import { findSlateBySelectionPath, SlateElement, useYooptaTools, YooEditor, YooptaBlock } from '@yoopta/editor';
import { Editor, Element, Transforms } from 'slate';

type ToolbarComponentProps = {
  activeBlock?: YooptaBlock;
  editor: YooEditor;
};

type LinkValues = {
  title?: string;
  url: string;
};

const DEFAULT_MODALS = { link: false, highlight: false, actionMenu: false };
type ModalsState = typeof DEFAULT_MODALS;

const DefaultToolbarRender = ({ activeBlock, editor }: ToolbarComponentProps) => {
  const [modals, setModals] = useState<ModalsState>({ link: false, highlight: false, actionMenu: false });
  const [linkValues, setLinkValues] = useState<LinkValues>({ title: '', url: '' });

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
  const ActionMenuList = tools.ActionMenu;
  const LinkTool = tools.LinkTool;

  useEffect(() => {
    if (modals.link) {
      const slate = findSlateBySelectionPath(editor);
      if (!slate || !slate.selection) return;

      const title = Editor.string(slate, slate?.selection);
      setLinkValues((p) => ({ ...p, title }));
    }
  }, [editor.selection, modals.link]);

  const onUpdateLink = (link: LinkValues) => {
    const slate = findSlateBySelectionPath(editor);
    if (!slate) return;

    Editor.withoutNormalizing(slate, () => {
      if (!slate.selection) return;

      const linkNode = {
        type: 'link',
        children: [{ text: link.title }],
        props: {
          url: link.url,
          target: '_blank',
          rel: 'noreferrer',
          nodeType: 'inline',
          title: link.title,
        },
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

      editor.applyChanges();
      editor.emit('change', editor.children);
      onChangeModal('link', false);
    });
  };

  const onDeleteLink = () => {};

  const isActiveTriggerModal = (modal: keyof ModalsState) => modals[modal];
  const getModalTriggerStyle = (modal: keyof ModalsState) => ({
    backgroundColor: isActiveTriggerModal(modal) ? '#f4f4f5' : undefined,
  });

  return (
    <Toolbar.Root className="yoo-toolbar-bg-white yoo-toolbar-flex yoo-toolbar-z-50 yoo-toolbar-p-[5px] yoo-toolbar-rounded-md yoo-toolbar-shadow-md yoo-toolbar-border yoo-toolbar-shadow-y-[4px]">
      <Toolbar.ToggleGroup
        className="yoo-toolbar-flex yoo-toolbar-items-center"
        type="single"
        aria-label="Block formatting"
      >
        <Toolbar.ToggleItem
          className="yoo-toolbar-h-full yoo-toolbar-px-[10px] yoo-toolbar-py-0 hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md"
          value={blockLabel}
          aria-label={blockLabel}
          ref={actionMenuRefs.setReference}
          onClick={() => onChangeModal('actionMenu', !modals.actionMenu)}
          style={getModalTriggerStyle('actionMenu')}
        >
          <span className="yoo-toolbar-mr-0">{blockLabel}</span>
          {modals.actionMenu && !!ActionMenuList && (
            <FloatingPortal id="action-menu-list-portal" root={document.getElementById('yoopta-editor')}>
              <div style={actionMenuStyles} ref={actionMenuRefs.setFloating}>
                <ActionMenuList
                  actions={Object.keys(editor.blocks)}
                  editor={editor}
                  selectedAction={blockLabel}
                  onClose={() => onChangeModal('actionMenu', false)}
                  empty={false}
                  onMouseEnter={() => undefined}
                  mode="toggle"
                />
              </div>
            </FloatingPortal>
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
          className="yoo-toolbar-h-full yoo-toolbar-px-[10px] yoo-toolbar-py-0 hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md"
          value="LinkTool"
          aria-label="LinkTool"
          ref={linkToolRefs.setReference}
          onClick={() => onChangeModal('link', !modals.link)}
          style={getModalTriggerStyle('link')}
        >
          <span className="yoo-toolbar-mr-0">Link</span>
          {modals.link && !!LinkTool && (
            <FloatingPortal id="link-tool-portal" root={document.getElementById('yoopta-editor')}>
              {/* <FloatingOverlay lockScroll className="z-[100]"> */}
              <div style={linkToolStyles} ref={linkToolRefs.setFloating} onClick={(e) => e.stopPropagation()}>
                <LinkTool link={linkValues} onSave={onUpdateLink} />
              </div>
              {/* </FloatingOverlay> */}
            </FloatingPortal>
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
            className="yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="bold"
            aria-label="Bold"
            style={getItemStyle('bold')}
            onClick={() => editor.formats.bold.toggle()}
          >
            <FontBoldIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.italic && (
          <Toolbar.ToggleItem
            className="yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="italic"
            aria-label="Italic"
            style={getItemStyle('italic')}
            onClick={() => editor.formats.italic.toggle()}
          >
            <FontItalicIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.underline && (
          <Toolbar.ToggleItem
            className="yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="underline"
            aria-label="Underline"
            style={getItemStyle('underline')}
            onClick={() => editor.formats.underline.toggle()}
          >
            <UnderlineIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.strike && (
          <Toolbar.ToggleItem
            className="yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="strike"
            aria-label="Strike"
            style={getItemStyle('strike')}
            onClick={() => editor.formats.strike.toggle()}
          >
            <StrikethroughIcon width={20} height={20} />
          </Toolbar.ToggleItem>
        )}
        {editor.formats.code && (
          <Toolbar.ToggleItem
            className="yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="code"
            aria-label="Code"
            style={getItemStyle('code')}
            onClick={() => editor.formats.code.toggle()}
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
              className="yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
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
