import {
  CSSProperties, FC, ReactNode, useEffect, useState,
} from 'react';
import cx from 'classnames';
import s from './Fade.module.scss';

const useMountTransition = (show: boolean, unmountDelay: number) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (show && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!show && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, show, hasTransitionedIn]);

  return hasTransitionedIn;
};

type FadeProps = {
  show: boolean;
  animationDelay?: number;
  children: ReactNode;
  styles?: CSSProperties;
};

const Fade: FC<FadeProps> = ({
  show, animationDelay = 500, children, styles,
}) => {
  const hasTransitionedIn = useMountTransition(show, animationDelay);

  if (hasTransitionedIn || show) {
    return (
      <div
        className={cx(show ? s.fadeIn : s.fadeOut)}
        contentEditable={false}
        style={{ animationDuration: `${animationDelay + 100}ms`, ...styles }}
      >
        {children}
      </div>
    );
  }

  return null;
};

export { Fade };
