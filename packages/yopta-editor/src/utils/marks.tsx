import { RenderLeafProps } from 'slate-react';

export type YoptaMark = {
  type: string;
  render: (props: RenderLeafProps) => JSX.Element;
};

export type YoptaMarksConfig = {
  type: string;
  className: string;
};

export function createYoptaMark({ type, className }: YoptaMarksConfig): YoptaMark {
  return {
    type,
    render: (props) => {
      return (
        <span {...props.attributes} className={className}>
          {props.children}
        </span>
      );
    },
  };
}
