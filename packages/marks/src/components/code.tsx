import { YooptaMarkProps, createYooptaMark } from '@yoopta/editor';

type CodeMarkProps = YooptaMarkProps<'code', boolean>;

export const CodeMark = createYooptaMark<CodeMarkProps>({
  type: 'code',
  hotkey: 'mod+e',
  render: (props) => (
    <code className="yoo-marks-bg-[#F2F2F2] yoo-marks-py-[3px] yoo-marks-px-[6px] yoo-marks-rounded yoo-marks-text-[12px] yoopta-mark-code">
      {props.children}
    </code>
  ),
});
