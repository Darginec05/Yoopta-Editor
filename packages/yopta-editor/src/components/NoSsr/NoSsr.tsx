import { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode; // React.ReactNode
  fallback?: any; // JSX.Element
};

const NoSSR = ({ children, fallback = null }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return fallback;
  }

  return children;
};

export default NoSSR;
