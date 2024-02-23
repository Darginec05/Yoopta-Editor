import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  UnderlineIcon,
  TextIcon,
} from '@radix-ui/react-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { YooEditor, YooptaBlock } from '../../editor/types';

import { useState } from 'react';
import { useFloating, offset, flip, shift, inline, autoUpdate, FloatingPortal } from '@floating-ui/react';

type ToolbarComponentProps = {
  activeBlock?: YooptaBlock;
  editor: YooEditor;
};

const ToolbarComponent = ({ activeBlock, editor }: ToolbarComponentProps) => {
  const [isHighlightDropdownOpen, setIsHighlightDropdownOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    open: isHighlightDropdownOpen,
    onOpenChange: setIsHighlightDropdownOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const getItemStyle = (type) => ({
    backgroundColor: editor.formats[type]?.isActive() ? '#1183ff' : undefined,
    color: editor.formats[type]?.isActive() ? '#fff' : undefined,
  });

  const handleHighlight = (prop: 'color' | 'backgroundColor', color: string) => {
    const currentValue = editor.formats.highlight.getValue();
    console.log('change highlight', { [prop]: color });

    editor.formats.highlight.update({
      ...currentValue,
      [prop]: color,
    });
  };

  const label = activeBlock?.options?.displayLabel || activeBlock?.type || '';

  return (
    <Toolbar.Root className="bg-white flex z-50 p-[5px] rounded-md shadow-md border shadow-y-[4px]">
      <Toolbar.ToggleGroup className="flex items-center" type="single" aria-label="Block formatting">
        <Toolbar.ToggleItem
          className="h-full px-[10px] py-0 hover:bg-[#f4f4f5] rounded-md"
          value={label}
          aria-label={label}
        >
          <span className="mr-0">{label}</span>
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
        <Toolbar.ToggleItem
          className="h-[32px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="bold"
          aria-label="Bold"
          style={getItemStyle('bold')}
          onClick={() => editor.formats.bold.toggle()}
        >
          <FontBoldIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="italic"
          aria-label="Italic"
          style={getItemStyle('italic')}
          onClick={() => editor.formats.italic.toggle()}
        >
          <FontItalicIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="underline"
          aria-label="Underline"
          style={getItemStyle('underline')}
          onClick={() => editor.formats.underline.toggle()}
        >
          <UnderlineIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="strike"
          aria-label="Strike"
          style={getItemStyle('strike')}
          onClick={() => editor.formats.strike.toggle()}
        >
          <StrikethroughIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="code"
          aria-label="Code"
          style={getItemStyle('code')}
          onClick={() => editor.formats.code.toggle()}
        >
          <CodeIcon width={20} height={20} />
        </Toolbar.ToggleItem>

        {/* start */}

        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="highlight"
          aria-label="highlight"
          // style={getItemStyle('highlight')}
          style={{
            backgroundColor: editor.formats.highlight?.getValue()?.backgroundColor,
            color: editor.formats.highlight?.getValue()?.color,
          }}
          onClick={() => setIsHighlightDropdownOpen((prev) => !prev)}
          ref={refs.setReference}
        >
          <TextIcon width={20} height={20} />
        </Toolbar.ToggleItem>

        {isHighlightDropdownOpen && (
          <FloatingPortal>
            <div
              style={{
                ...floatingStyles,
                width: '100px',
                backgroundColor: '#fff',
              }}
              ref={refs.setFloating}
            >
              <p>background</p>
              <button
                className="bg-[#f4f4f5] text-black px-2 py-1 rounded-md"
                onClick={() => handleHighlight('backgroundColor', 'rgb(176, 171, 250)')}
              >
                purple
              </button>
              <button
                className="bg-[#f4f4f5] text-black px-2 py-1 rounded-md"
                onClick={() => handleHighlight('backgroundColor', 'yellow')}
              >
                yellow
              </button>
              <button
                className="bg-[#f4f4f5] text-black px-2 py-1 rounded-md"
                onClick={() => handleHighlight('backgroundColor', 'red')}
              >
                red
              </button>
              <p>color</p>
              <button
                className="bg-[#f4f4f5] text-black px-2 py-1 rounded-md"
                onClick={() => handleHighlight('color', 'rgb(176, 171, 250)')}
              >
                purple
              </button>
              <button
                className="bg-[#f4f4f5] text-black px-2 py-1 rounded-md"
                onClick={() => handleHighlight('color', 'yellow')}
              >
                yellow
              </button>
              <button
                className="bg-[#f4f4f5] text-black px-2 py-1 rounded-md"
                onClick={() => handleHighlight('color', 'red')}
              >
                red
              </button>
            </div>
          </FloatingPortal>
        )}

        {/* end */}
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { ToolbarComponent };
