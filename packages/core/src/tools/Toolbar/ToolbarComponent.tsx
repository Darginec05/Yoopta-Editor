import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  UnderlineIcon,
  ChevronDownIcon,
  TextIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { YooEditor, YooptaBlock } from '../../editor/types';
import { ActionMenuComponent } from '../ActionMenuList/ActionMenuComponent';
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
import { CSSProperties, MouseEvent, useState } from 'react';
import { HighlightColor } from './HighlightColor';

type ToolbarComponentProps = {
  activeBlock?: YooptaBlock;
  editor: YooEditor;
};

const ActionMenu = {
  component: ActionMenuComponent,
};

const ToolbarComponent = ({ activeBlock, editor }: ToolbarComponentProps) => {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isHighlightPickerOpen, setIsHighlightPickerOpen] = useState(false);

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

  return (
    <Toolbar.Root className="bg-white flex z-50 p-[5px] rounded-md shadow-md border shadow-y-[4px]">
      <Toolbar.ToggleGroup className="flex items-center" type="single" aria-label="Block formatting">
        {isActionMenuOpen && (
          <FloatingPortal root={document.getElementById('yoopta-editor')}>
            <FloatingOverlay lockScroll className="z-[100]" onClick={() => setIsActionMenuOpen(false)}>
              <div style={actionMenuStyles} ref={actionMenuRefs.setFloating}>
                <ActionMenu.component
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
          className="h-full px-[10px] py-0 hover:bg-[#f4f4f5] rounded-md"
          value={blockLabel}
          aria-label={blockLabel}
          ref={actionMenuRefs.setReference}
          onClick={() => setIsActionMenuOpen((open) => !open)}
        >
          <span className="mr-0">{blockLabel}</span>
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="bg-[#dbd8e0] mx-[6px] my-0 w-[1px]" />
      <Toolbar.ToggleGroup className="flex items-center" type="single" aria-label="Block formatting">
        <Toolbar.ToggleItem
          className="h-full px-[10px] py-0 hover:bg-[#f4f4f5] rounded-md"
          value="LinkTool"
          aria-label="LinkTool"
        >
          <span className="mr-0">Link</span>
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="bg-[#dbd8e0] mx-[6px] my-0 w-[1px]" />
      <Toolbar.ToggleGroup className="flex items-center" type="multiple" aria-label="Text formatting">
        {editor.formats.bold && (
          <Toolbar.ToggleItem
            className="h-[32px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
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
            className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
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
            className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
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
            className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
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
            className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
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
            className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
            value="highlight"
            aria-label="Highlight"
            style={getHighlightStyle()}
            ref={highlightPickerRefs.setReference}
            onClick={() => setIsHighlightPickerOpen((open) => !open)}
          >
            <span className="text-lg px-1 font-serif text-col">A</span>
            {isHighlightPickerOpen ? <ChevronUpIcon width={10} /> : <ChevronDownIcon width={10} />}
          </Toolbar.ToggleItem>
        )}
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { ToolbarComponent };
