import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { Button } from '../../ui/button';
import { ButtonBlockOptions } from './ButtonBlockOptions';

const ButtonRender = (props: PluginElementRenderProps) => {
  const block = useBlockData(props.blockId);
  const editor = useYooptaEditor();
  const element = props.element;

  return (
    <div className="yoopta-button-plugin mt-2">
      {!editor.readOnly && (
        <ButtonBlockOptions block={block} editor={editor} element={element} props={props.element.props} />
      )}
      <Button
        type="button"
        variant={element.props?.variant || 'default'}
        size={element.props?.size || 'default'}
        className="yoopta-button"
        {...props.attributes}
      >
        {props.children}
      </Button>
    </div>
  );
};

export { ButtonRender };
