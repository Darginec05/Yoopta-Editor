import { YooptaMarkProps, createYooptaMark } from '@yoopta/editor';

type CodeMarkProps = YooptaMarkProps<'code', boolean>;

export const CodeMark = createYooptaMark<CodeMarkProps>({
  type: 'code',
  hotkey: 'mod+e',
  render: (props) => (
    <code className="yoo-marks-bg-[#F2F2F2] yoo-marks-py-[2px] yoo-marks-px-[4px] yoo-marks-rounded yoo-marks-text-[75%]">
      {props.children}
    </code>
  ),
});
