import { RenderLeafProps } from 'slate-react';

export type YooptaMark = {
  type: string;
  hotkey?: string;
  render: (props: RenderLeafProps) => JSX.Element;
};

export type YooptaMarksConfig = {
  type: string;
  className: string;
  hotkey?: string;
};

export function createYooptaMark({ type, hotkey, className }: YooptaMarksConfig): YooptaMark {
  return {
    type,
    hotkey,
    render: (props) => {
      return (
        <span {...props.attributes} className={className}>
          {props.children}
        </span>
      );
    },
  };
}
