import { FloatingPortal } from '@floating-ui/react';
import { MutableRefObject, ReactNode, useEffect, useState } from 'react';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';

type Props = {
  children: ReactNode;
  id: string;
};

const Portal = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const editor = useYooptaEditor();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <FloatingPortal
      id={`${props.id}-${editor.id}`}
      root={document.querySelector(`[data-yoopta-editor-id="${editor.id}"]`) as HTMLElement}
    >
      {props.children}
    </FloatingPortal>
  );
};

export { Portal };
