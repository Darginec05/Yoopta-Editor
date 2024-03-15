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
import { CSSProperties, useState } from 'react';
import { HighlightColor } from './HighlightColor';
import { useYooptaTools, YooEditor, YooptaBlock } from '@yoopta/editor';

type ToolbarComponentProps = {
  activeBlock?: YooptaBlock;
  editor: YooEditor;
};

const ActionMenu = {
  // component: ActionMenuComponent,
};

const DefaultToolbarRender = ({ activeBlock, editor }: ToolbarComponentProps) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isHighlightPickerOpen, setIsHighlightPickerOpen] = useState(false);
  const tools = useYooptaTools();

  const { refs: actionMenuRefs, floatingStyles: actionMenuStyles } = useFloating({
    placement: 'bottom-start',
    open: isActionMenuOpen,
    onOpenChange: setIsActionMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const { refs: highlightPickerRefs, floatingStyles: highlightPickerStyles } = useFloating({
    placement: 'top-end',
    open: isHighlightPickerOpen,
    onOpenChange: setIsHighlightPickerOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const getItemStyle = (type) => ({
    backgroundColor: editor.formats[type]?.isActive() ? '#1183ff' : undefined,
    color: editor.formats[type]?.isActive() ? '#fff' : undefined,
  });

  const highlight = editor.formats.highlight;
  const highlightColors = highlight?.getValue();
  const getHighlightStyle = (): CSSProperties => {
    return {
      color: highlightColors?.color,
      backgroundColor: highlightColors?.backgroundColor,
      backgroundImage: highlightColors?.backgroundImage,
      WebkitTextFillColor: highlightColors?.webkitTextFillColor,
    };
  };

  const blockLabel = activeBlock?.options?.displayLabel || activeBlock?.type || '';
  const ActionMenuList = tools.ActionMenu;

  return (
    <Toolbar.Root className="yoo-toolbar-bg-white yoo-toolbar-flex yoo-toolbar-z-50 yoo-toolbar-p-[5px] yoo-toolbar-rounded-md yoo-toolbar-shadow-md yoo-toolbar-border yoo-toolbar-shadow-y-[4px]">
      <Toolbar.ToggleGroup
        className="yoo-toolbar-flex yoo-toolbar-items-center"
        type="single"
        aria-label="Block formatting"
      >
        {isActionMenuOpen && !!ActionMenuList && (
          <FloatingPortal root={document.getElementById('yoopta-editor')}>
            <FloatingOverlay lockScroll className="yoo-toolbar-z-[100]" onClick={() => setIsActionMenuOpen(false)}>
              <div style={actionMenuStyles} ref={actionMenuRefs.setFloating}>
                <ActionMenuList
                  actions={Object.keys(editor.blocks)}
                  editor={editor}
                  selectedAction={blockLabel}
                  onClose={() => setIsActionMenuOpen(false)}
                  empty={false}
                  onMouseEnter={() => undefined}
                  mode="toggle"
                />
              </div>
            </FloatingOverlay>
          </FloatingPortal>
        )}
        {isHighlightPickerOpen && (
          <HighlightColor
            editor={editor}
            floatingStyles={highlightPickerStyles}
            refs={highlightPickerRefs}
            onClose={() => setIsHighlightPickerOpen(false)}
            highlightColors={highlightColors}
          />
        )}
        <Toolbar.ToggleItem
          className="yoo-toolbar-h-full yoo-toolbar-px-[10px] yoo-toolbar-py-0 hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md"
          value={blockLabel}
          aria-label={blockLabel}
          ref={actionMenuRefs.setReference}
          onClick={() => setIsActionMenuOpen((open) => !open)}
        >
          <span className="mr-0">{blockLabel}</span>
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
        >
          <span className="mr-0">Link</span>
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
          <Toolbar.ToggleItem
            className="yoo-toolbar-ml-[2px] yoo-toolbar-h-[32px] hover:yoo-toolbar-bg-[#f4f4f5] yoo-toolbar-rounded-md yoo-toolbar-cursor-pointer yoo-toolbar-inline-flex yoo-toolbar-px-[5px] yoo-toolbar-py-0 yoo-toolbar-items-center yoo-toolbar-justify-center"
            value="highlight"
            aria-label="Highlight"
            style={getHighlightStyle()}
            ref={highlightPickerRefs.setReference}
            onClick={() => setIsHighlightPickerOpen((open) => !open)}
          >
            <span className="yoo-toolbar-text-lg yoo-toolbar-px-1 yoo-toolbar-font-serif yoo-toolbar-text-col">A</span>
            {isHighlightPickerOpen ? <ChevronUpIcon width={10} /> : <ChevronDownIcon width={10} />}
          </Toolbar.ToggleItem>
        )}
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { DefaultToolbarRender };
