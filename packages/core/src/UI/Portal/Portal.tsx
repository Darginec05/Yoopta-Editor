import { FloatingPortal } from '@floating-ui/react';
import { MutableRefObject, ReactNode, useEffect, useState } from 'react';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';

type Props = {
  children: ReactNode;
  id: string;
  root?: HTMLElement | null | MutableRefObject<HTMLElement | null>;
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
      // id="yoo-block-options-portal"
      // root={document.getElementById('yoopta-editor')}
      id={`${props.id}-${editor.id}`}
      root={props.root || (document.querySelector(editor.id) as HTMLElement)}
    >
      {props.children}
    </FloatingPortal>
  );
};

export { Portal };
