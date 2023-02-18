import cx from 'classnames';
import s from './HashLink.module.scss';

const HashLink = ({ text }) => {
  return <a href={`#${text}`} className={cx(s.anchor, 'yopta-anchor-link')} contentEditable={false} />;
};

export { HashLink };
