import { YooptaMarkProps, createYooptaMark } from '@yoopta/editor';

type CodeMarkProps = YooptaMarkProps<'code', boolean>;

export const CodeMark = createYooptaMark<CodeMarkProps>({
  type: 'code',
  hotkey: 'mod+e',
  render: (props) => <code className="bg-[#F2F2F2] py-[2px] px-[4px] rounded text-[75%]">{props.children}</code>,
});
