import s from './Image.module.scss';

const Image = ({ attributes, element, children, size }) => {
  const width = size?.width || element.options?.size?.width || '100%';
  const height = size?.height || element.options?.size?.height || 400;

  const caption = element.options?.caption;

  if (!element.url) return null;

  return (
    <div {...attributes} className={s.imgElement} contentEditable={false} draggable={false}>
      <figure className={s.figure} onDragStart={(e) => e.preventDefault()}>
        <img
          src={element.url}
          alt={caption}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className={s.img}
        />
        {caption && <figcaption className={s.caption}>{caption}</figcaption>}
      </figure>
      {children}
    </div>
  );
};

export { Image };
