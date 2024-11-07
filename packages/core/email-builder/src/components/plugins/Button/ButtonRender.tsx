import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { Button } from '../../ui/button';
import { ButtonBlockOptions } from './ButtonBlockOptions';

const ButtonRender = (props: PluginElementRenderProps) => {
  const block = useBlockData(props.blockId);
  const editor = useYooptaEditor();
  const element = props.element;

  return (
    <div className="yoopta-button-plugin">
      {!editor.readOnly && <ButtonBlockOptions block={block} editor={editor} props={props.element.props} />}
      <Button {...props.attributes} type="button" variant={element.props?.variant}>
        {props.children}
      </Button>
    </div>
  );
};

export { ButtonRender };
