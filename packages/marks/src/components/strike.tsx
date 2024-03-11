import { createYooptaMark, YooptaMarkProps } from '@yoopta/editor';

type StrikeMarkProps = YooptaMarkProps<'strike', boolean>;

export const Strike = createYooptaMark<StrikeMarkProps>({
  type: 'strike',
  hotkey: 'mod+shift+s',
  render: (props) => <s className="yoo-marks-stroke">{props.children}</s>,
});
