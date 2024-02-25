import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  UnderlineIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@radix-ui/react-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { YooEditor, YooptaBlock } from '../../editor/types';

import { useState } from 'react';
import { useFloating, offset, flip, shift, inline, autoUpdate, FloatingPortal } from '@floating-ui/react';

type ToolbarComponentProps = {
  activeBlock?: YooptaBlock;
  editor: YooEditor;
};

const colors = [
  ['Default', 'black'],
  ['Gray', '#787774'],
  ['Brown', '#976D57'],
  ['Orange', '#CC772F'],
  ['Yellow', '#C29243'],
  ['Green', '#548064'],
  ['Blue', '#477DA5'],
  ['Purple', '#A48BBE'],
  ['Pink', '#B35588'],
  ['Red', '#C4554D'],
];

const backgroundColors = [
  ['Default', 'unset'],
  ['Gray', '#F1F1EF'],
  ['Brown', '#F3EEEE'],
  ['Orange', '#F8ECDF'],
  ['Yellow', '#FAF3DD'],
  ['Green', '#EEF3ED'],
  ['Blue', '#E9F3F7'],
  ['Purple', '#F6F3F8'],
  ['Pink', '#F9F2F5'],
  ['Red', '#FAECEC'],
];

const ToolbarComponent = ({ activeBlock, editor }: ToolbarComponentProps) => {
  const [isHighlightDropdownOpen, setIsHighlightDropdownOpen] = useState(false);
  const highlightValue = editor.formats.highlight?.getValue() || {};

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
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="highlight"
          aria-label="highlight"
          onClick={() => setIsHighlightDropdownOpen((prev) => !prev)}
          ref={refs.setReference}
        >
          <span
            className="text-lg px-1 font-serif"
            style={{
              backgroundColor: highlightValue.backgroundColor,
              color: highlightValue.color,
            }}
          >
            A
          </span>
          {isHighlightDropdownOpen ? (
            <ChevronUpIcon width={20} height={20} />
          ) : (
            <ChevronDownIcon width={20} height={20} />
          )}
        </Toolbar.ToggleItem>

        {isHighlightDropdownOpen && (
          <FloatingPortal>
            <div
              className="min-w-150 bg-white shadow-md p-1 flex flex-col rounded-md"
              style={floatingStyles}
              ref={refs.setFloating}
            >
              <p className="text-sm mx-2 text-gray-500 cursor-default">color</p>

              {colors.map(([label, color]) => (
                <button
                  key={label}
                  className={`bg-[${color}] text-black px-2 py-0 rounded-md text-left`}
                  onClick={() => handleHighlight('color', color)}
                  style={{
                    backgroundColor: highlightValue.color === color ? 'ghostwhite' : undefined,
                  }}
                >
                  <span
                    className="text-lg px-1 font-serif my-1 mx-2"
                    style={{
                      color,
                    }}
                  >
                    A
                  </span>
                  {label}
                </button>
              ))}

              <p className="text-sm mx-2 text-gray-500 cursor-default pt-1">background</p>

              {backgroundColors.map(([label, color]) => (
                <button
                  key={label}
                  className={`bg-[${color}] text-black px-2 py-0 rounded-md text-left`}
                  onClick={() => handleHighlight('backgroundColor', color)}
                  style={{
                    backgroundColor: highlightValue.backgroundColor === color ? 'ghostwhite' : undefined,
                  }}
                >
                  <span
                    className="text-lg px-1 font-serif mx-2"
                    style={{
                      backgroundColor: color,
                    }}
                  >
                    A
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </FloatingPortal>
        )}
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { ToolbarComponent };
