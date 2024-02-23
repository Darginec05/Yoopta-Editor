import { FontBoldIcon, FontItalicIcon, StrikethroughIcon, CodeIcon, UnderlineIcon } from '@radix-ui/react-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { YooEditor, YooptaBlock } from '../../editor/types';

type ToolbarComponentProps = {
  activeBlock?: YooptaBlock;
  editor: YooEditor;
};

const ToolbarComponent = ({ activeBlock, editor }: ToolbarComponentProps) => {
  const getItemStyle = (type) => ({
    backgroundColor: editor.formats[type]?.isActive() ? '#1183ff' : undefined,
    color: editor.formats[type]?.isActive() ? '#fff' : undefined,
  });

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
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
};

export { ToolbarComponent };
