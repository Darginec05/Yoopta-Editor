import { RenderLeafProps } from 'slate-react';
import { ExtendedLeaf, YooptaMarkProps } from '../plugins/types';

export type YooptaMark<TProps> = {
  type: string;
  hotkey?: string;
  render: (props: TProps) => JSX.Element;
};

export type YooptaMarkParams<TProps> = {
  type: string;
  hotkey?: string;
  render: (props: TProps) => JSX.Element;
};

export function createYooptaMark<TProps>({ type, hotkey, render }: YooptaMarkParams<TProps>): YooptaMark<TProps> {
  return {
    type,
    hotkey,
    render,
  };
}

type BoldMarkProps = YooptaMarkProps<'bold', boolean>;

export const Bold = createYooptaMark<BoldMarkProps>({
  type: 'bold',
  hotkey: 'mod+b',
  render: (props) => <strong>{props.children}</strong>,
});

type ItalicMarkProps = YooptaMarkProps<'italic', boolean>;

export const Italic = createYooptaMark<ItalicMarkProps>({
  type: 'italic',
  hotkey: 'mod+i',
  render: (props) => <i>{props.children}</i>,
});

type UnderlineMarkProps = YooptaMarkProps<'underline', boolean>;

export const Underline = createYooptaMark<UnderlineMarkProps>({
  type: 'underline',
  hotkey: 'mod+u',
  render: (props) => <u>{props.children}</u>,
});

type StrikeMarkProps = YooptaMarkProps<'strike', boolean>;

export const Strike = createYooptaMark<StrikeMarkProps>({
  type: 'strike',
  hotkey: 'mod+shift+s',
  render: (props) => <s>{props.children}</s>,
});

type CodeMarkProps = YooptaMarkProps<'code', boolean>;

export const CodeMark = createYooptaMark<CodeMarkProps>({
  type: 'code',
  hotkey: 'mod+e',
  render: (props) => <code>{props.children}</code>,
});

export type LeafColorProps = {
  color: string;
  backgroundColor: string;
  backgroundImage?: string;
  backgroundClip?: string;
  webkitTextFillColor?: string;
};

export const Highlight = createYooptaMark<YooptaMarkProps<'highlight', LeafColorProps>>({
  type: 'highlight',
  render: (props: YooptaMarkProps<'highlight', LeafColorProps>) => {
    const highlight = props.leaf?.highlight;

    return (
      <span
        style={{
          color: highlight?.color,
          backgroundImage: highlight?.backgroundImage,
          WebkitTextFillColor: highlight?.webkitTextFillColor,
          backgroundClip: highlight?.backgroundClip,
        }}
      >
        {props.children}
      </span>
    );
  },
});
