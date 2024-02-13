import { RenderElementProps } from 'slate-react';

const CalloutRender = (props: RenderElementProps) => {
  return (
    <div
      data-element-type="Callout"
      {...props.attributes}
      className="rounded-md mt-4 p-2 pl-4 leading-7 bg-info text-info-foreground bg-[rgba(245,247,249,1.00)]"
    >
      {props.children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };
