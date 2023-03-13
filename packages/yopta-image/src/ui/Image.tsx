import s from './Image.module.scss';

const FALLBACK =
  'https://www.shutterstock.com/image-illustration/military-robot-destroyed-city-future-260nw-1207217143.jpg';

const Image = ({ attributes, element, children, size }) => {
  return (
    <div {...attributes} contentEditable={false}>
      <figure className={s.figure}>
        <img
          src={element.url || FALLBACK}
          alt={element.alt}
          width={size.width}
          height={size.height}
          loading="lazy"
          decoding="async"
          className={s.img}
        />
        <figcaption className={s.caption}>Fig.1 - Trulli, Puglia, Italy.</figcaption>
      </figure>
      {children}
    </div>
  );
};

export { Image };
