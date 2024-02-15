import { YooptaMarkProps } from '../plugins/types';

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
  render: (props) => <strong className="bold">{props.children}</strong>,
});

type ItalicMarkProps = YooptaMarkProps<'italic', boolean>;

export const Italic = createYooptaMark<ItalicMarkProps>({
  type: 'italic',
  hotkey: 'mod+i',
  render: (props) => <i className="italic">{props.children}</i>,
});

type UnderlineMarkProps = YooptaMarkProps<'underline', boolean>;

export const Underline = createYooptaMark<UnderlineMarkProps>({
  type: 'underline',
  hotkey: 'mod+u',
  render: (props) => <u className="underline">{props.children}</u>,
});

type StrikeMarkProps = YooptaMarkProps<'strike', boolean>;

export const Strike = createYooptaMark<StrikeMarkProps>({
  type: 'strike',
  hotkey: 'mod+shift+s',
  render: (props) => <s className="stroke">{props.children}</s>,
});

type CodeMarkProps = YooptaMarkProps<'code', boolean>;

export const CodeMark = createYooptaMark<CodeMarkProps>({
  type: 'code',
  hotkey: 'mod+e',
  render: (props) => <code className="bg-[#87837826] py-[0.2em] px-[0.4em] rounded text-[85%]">{props.children}</code>,
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
  render: (props) => {
    const highlight = props.leaf?.highlight;

    console.log('highlight', highlight);

    const style = {
      color: highlight?.color,
      backgroundImage: highlight?.backgroundImage,
      WebkitTextFillColor: highlight?.webkitTextFillColor,
      backgroundClip: highlight?.backgroundClip,
    };

    return <span style={style}>{props.children}</span>;
  },
});
