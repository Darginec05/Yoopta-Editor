import { RenderLeafProps } from 'slate-react';

export type YoptaMark = {
  type: string;
  hotkey?: string;
  render: (props: RenderLeafProps) => JSX.Element;
};

export type YoptaMarksConfig = {
  type: string;
  className: string;
  hotkey?: string;
};

export function createYoptaMark({ type, hotkey, className }: YoptaMarksConfig): YoptaMark {
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
