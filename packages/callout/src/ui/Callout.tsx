import { CSSProperties } from 'react';
import { RenderElementProps } from 'slate-react';
import { CalloutType } from '../types';

const CALLOUT_TYPE_STYLES: Record<CalloutType, CSSProperties> = {
  nostyles: {},
  default: {},
  success: {},
  warning: {},
  error: {},
};

const CalloutRender = ({ element, attributes, children }: RenderElementProps) => {
  const { type = 'nostyles' } = element;
  const styles = CALLOUT_TYPE_STYLES[type];

  return (
    <div
      data-element-type="Callout"
      {...attributes}
      style={styles}
      className="yoo-c-rounded-md yoo-c-mt-2 yoo-c-p-2 yoo-c-pl-4 yoo-c-leading-7 yoo-c-bg-info yoo-c-text-info-foreground yoo-c-bg-[rgba(245,247,249,1.00)]"
      // className="yoo-c-rounded-md yoo-c-border-l-4 yoo-c-p-2 yoo-c-pl-4 yoo-c-border-info-foreground yoo-c-bg-info yoo-c-text-info-foreground"
    >
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };
