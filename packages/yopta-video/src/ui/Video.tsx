import s from './Video.module.scss';

const FALLBACK =
  'https://www.shutterstock.com/image-illustration/military-robot-destroyed-city-future-260nw-1207217143.jpg';

const Video = ({ attributes, element, children }) => {
  return (
    <div {...attributes} contentEditable={false}>
      <figure className={s.figure}></figure>
      {children}
    </div>
  );
};

export { Video };
