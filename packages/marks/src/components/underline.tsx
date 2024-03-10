import { createYooptaMark, YooptaMarkProps } from '@yoopta/editor';

type UnderlineMarkProps = YooptaMarkProps<'underline', boolean>;

export const Underline = createYooptaMark<UnderlineMarkProps>({
  type: 'underline',
  hotkey: 'mod+u',
  render: (props) => <u className="underline">{props.children}</u>,
});
