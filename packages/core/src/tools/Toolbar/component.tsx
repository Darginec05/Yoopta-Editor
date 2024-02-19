import { FontBoldIcon, FontItalicIcon, StrikethroughIcon, CodeIcon, UnderlineIcon } from '@radix-ui/react-icons';
import { useTools } from '../../contexts/UltraYooptaContext/ToolsContext';
import { TextFormats } from '../../editor';
import * as Toolbar from '@radix-ui/react-toolbar';

const ToolbarComponent = ({ activeBlock, editor }) => {
  const isActive = (type) => TextFormats.isActive(editor, { type });
  const getItemStyle = (type) => ({
    backgroundColor: isActive(type) ? '#1183ff' : undefined,
    color: isActive(type) ? '#fff' : undefined,
  });

  const label = activeBlock?.options?.displayLabel || activeBlock?.type;

  return (
    <Toolbar.Root className="bg-white flex z-50 p-[5px] rounded-md shadow-md">
      <Toolbar.ToggleGroup className="flex items-center" type="single" aria-label="Block formatting">
        <Toolbar.ToggleItem
          className="h-full px-[5px] py-0 hover:bg-[#f4f4f5] rounded-md"
          value={label}
          aria-label={label}
        >
          <span className="mr-0">{label}</span>
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Separator className="bg-[#dbd8e0] mx-[6px] my-0 w-[1px]" />
      <Toolbar.ToggleGroup className="flex items-center" type="single" aria-label="Block formatting">
        <Toolbar.ToggleItem
          className="h-full px-[5px] py-0 hover:bg-[#f4f4f5] rounded-md"
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
          onClick={() => TextFormats.toggle(editor, { type: 'bold' })}
        >
          <FontBoldIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="italic"
          aria-label="Italic"
          style={getItemStyle('italic')}
          onClick={() => TextFormats.toggle(editor, { type: 'italic' })}
        >
          <FontItalicIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="underline"
          aria-label="Underline"
          style={getItemStyle('underline')}
          onClick={() => TextFormats.toggle(editor, { type: 'underline' })}
        >
          <UnderlineIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="strike"
          aria-label="Strike"
          style={getItemStyle('strike')}
          onClick={() => TextFormats.toggle(editor, { type: 'strike' })}
        >
          <StrikethroughIcon width={20} height={20} />
        </Toolbar.ToggleItem>
        <Toolbar.ToggleItem
          className="h-[32px] ml-[2px] hover:bg-[#f4f4f5] rounded-md cursor-pointer inline-flex px-[5px] py-0 items-center justify-center"
          value="code"
          aria-label="Code"
          style={getItemStyle('code')}
          onClick={() => TextFormats.toggle(editor, { type: 'code' })}
        >
          <CodeIcon width={20} height={20} />
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { ToolbarComponent };
