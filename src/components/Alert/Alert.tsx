import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { Fade } from '../Fade';
import s from './Alert.module.scss';

function ReactPortal({ children }) {
  return createPortal(children, document.body);
}

type Status = 'info' | 'success' | 'error';
type Position = 'left' | 'center' | 'right';

type Options = {
  notifyComponent?: ReactNode;
  position?: Position;
  callback?: () => void;
};

type Props = {
  message: string;
  // status: Status;
  // position: Position;
  // callback: Position;
} & Options;

const AlertUI = ({ message, status, position }: Props) => (
  <div className={cx(s.alertContent, s[status], s[position])}>{message}</div>
);

const AlertContext = createContext({
  info: (message: string, options?: Options) => {},
  error: (message: string, options?: Options) => {},
  success: (message: string, options?: Options) => {},
});

const AlertProvider = ({ children }) => {
  const [notifications, setNotifications] = useState<ReactNode[]>([]);

  const info = (message: string, options?: Options) => {
    const InfoComponent = options?.notifyComponent || AlertUI;
    const position = options?.position || 'center';
    console.log({ position });

    setNotifications((prevNotifs) =>
      prevNotifs.concat(<InfoComponent message={message} status="info" position={position} />),
    );
  };

  const error = (message: string, options?: Options) => {
    const ErrorComponent = options?.notifyComponent || AlertUI;
    setNotifications((prevNotifs) => prevNotifs.concat(<ErrorComponent message={message} status="error" />));
  };

  const success = (message: string, options?: Options) => {
    const SuccessComponent = options?.notifyComponent || AlertUI;
    setNotifications((prevNotifs) => prevNotifs.concat(<SuccessComponent message={message} status="success" />));
  };

  const renderNotifications = () => {
    if (notifications.length === 0) return null;

    return notifications.map((NotificationComponent, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fade key={key} animationDelay={150} show={!!NotificationComponent}>
        {NotificationComponent}
      </Fade>
    ));
  };

  const value = useMemo(
    () => ({
      info,
      error,
      success,
    }),
    [],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <ReactPortal>
        <div className={s.alertRoot}>{renderNotifications()}</div>
      </ReactPortal>
    </AlertContext.Provider>
  );
};

const useAlert = () => useContext(AlertContext);

export { AlertContext, AlertProvider, useAlert };
