import { RenderElementProps } from 'slate-react';

const CalloutRender = (props: RenderElementProps) => {
  return (
    <div
      data-element-type="Callout"
      {...props.attributes}
      className="yoo-c-rounded-md yoo-c-mt-2 yoo-c-p-2 yoo-c-pl-4 yoo-c-leading-7 yoo-c-bg-info yoo-c-text-info-foreground yoo-c-bg-[rgba(245,247,249,1.00)]"
    >
      {props.children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };
