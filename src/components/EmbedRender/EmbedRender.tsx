import s from './EmbedRender.module.scss';

type EmbedProps = JSX.IntrinsicElements['iframe'];

const EmbedRender = ({ src, title }: EmbedProps) => {
  return (
    <iframe
      src={src}
      title={title || `embed-${src}`}
      className={s.embed}
      loading="lazy"
      height={500}
      width="100%"
      allowFullScreen
      frameBorder={0}
    />
  );
};

export { EmbedRender };
