import { RenderLeafProps } from 'slate-react';
import cx from 'classnames';

export type YooptaMark = {
  type: string;
  hotkey?: string;
  render: (props: RenderLeafProps) => JSX.Element;
};

export type YooptaMarksConfig = {
  type: string;
  className: string;
  hotkey?: string;
  as?: string;
};

export function createYooptaMark({ type, hotkey, className, as }: YooptaMarksConfig): YooptaMark {
  const freezed = Object.freeze({
    type,
    hotkey,
    render: (props) => {
      const Node = as || 'span';

      return (
        <Node {...props.attributes} className={cx(className, `yoopta-leaf-${type}`)}>
          {props.children}
        </Node>
      );
    },
  });

  return freezed;
}
