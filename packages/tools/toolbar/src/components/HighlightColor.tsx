// import { ChevronUpIcon } from '@radix-ui/react-icons';
import { CSSProperties, MouseEvent } from 'react';
import { YooEditor, UI } from '@yoopta/editor';
const { Portal } = UI;

const colors = [
  ['Default', 'black'],
  ['Gray', '#787774'],
  ['Brown', '#976D57'],
  ['Orange', '#CC772F'],
  ['Yellow', '#C29243'],
  ['Green', '#548064'],
  ['Blue', '#477DA5'],
  ['Purple', '#A48BBE'],
  ['Pink', '#B35588'],
  ['Red', '#C4554D'],
];

const backgroundColors = [
  ['Default', 'unset'],
  ['Gray', '#F1F1EF'],
  ['Brown', '#F3EEEE'],
  ['Orange', '#F8ECDF'],
  ['Yellow', '#FAF3DD'],
  ['Green', '#EEF3ED'],
  ['Blue', '#E9F3F7'],
  ['Purple', '#F6F3F8'],
  ['Pink', '#F9F2F5'],
  ['Red', '#FAECEC'],
];

// const linearGradients = [
//   ['Default', 'linear-gradient(90deg, #000000 0%, #000000 100%)'],
//   ['Gray', 'linear-gradient(90deg, #787774 0%, #787774 100%)'],
//   ['Brown', 'linear-gradient(90deg, #976D57 0%, #976D57 100%)'],
//   ['Orange', 'linear-gradient(90deg, #CC772F 0%, #CC772F 100%)'],
//   ['Yellow', 'linear-gradient(90deg, #C29243 0%, #C29243 100%)'],
//   ['Green', 'linear-gradient(90deg, #548064 0%, #548064 100%)'],
//   ['Blue', 'linear-gradient(90deg, #477DA5 0%, #477DA5 100%)'],
//   ['Purple', 'linear-gradient(90deg, #A48BBE 0%, #A48BBE 100%)'],
//   ['Pink', 'linear-gradient(90deg, #B35588 0%, #B35588 100%)'],
//   ['Red', 'linear-gradient(90deg, #C4554D 0%, #C4554D 100%)'],
// ];

const itemStyles = {
  border: '1px solid #e3e3e3',
};

type Props = {
  editor: YooEditor;
  highlightColors: CSSProperties;
  onClose: () => void;
  refs: { setFloating: (el: any) => void };
  floatingStyles: React.CSSProperties;
};

const HighlightColor = ({ editor, highlightColors, onClose, refs, floatingStyles }: Props) => {
  const getItemStyles = (type, color) => {
    if (highlightColors?.[type] === color) {
      return {
        border: '2px solid #3b82f6',
        backgroundColor: color,
      };
    }

    return { backgroundColor: color, ...itemStyles };
  };

  const updateColor = (type, color) => {
    const value = editor.formats.highlight.getValue();
    if (value?.[type] === color) {
      editor.formats.highlight.update({ ...highlightColors, [type]: undefined });
      return;
    }

    editor.formats.highlight.update({ ...highlightColors, [type]: color });
  };

  return (
    <Portal id="yoo-highlight-color-portal">
      <div style={floatingStyles} ref={refs.setFloating} onClick={(e: MouseEvent) => e.stopPropagation()}>
        <div className="yoo-toolbar-bg-[#FFFFFF] yoo-toolbar-p-[5px] yoo-toolbar-rounded-md yoo-toolbar-shadow-md yoo-toolbar-border-[1px] yoo-toolbar-border-solid yoo-toolbar-border-[#e5e7eb] yoo-toolbar-shadow-y-[4px]">
          <div className="yoo-toolbar-flex yoo-toolbar-items-center yoo-toolbar-justify-between">
            <span className="yoo-toolbar-text-xs">Text color</span>
          </div>
          <div className="yoo-toolbar-flex yoo-toolbar-items-center">
            {colors.map(([label, color]) => (
              <button
                key={label}
                title={label}
                type="button"
                className="yoopta-button yoo-toolbar-w-[25px] yoo-toolbar-h-[25px] yoo-toolbar-rounded-md yoo-toolbar-mx-[2px] yoo-toolbar-my-[5px] yoo-toolbar-border yoo-toolbar-border-solid-[#e3e3e3]"
                style={getItemStyles('color', color)}
                onClick={() => updateColor('color', color)}
              />
            ))}
          </div>
          <div className="yoo-toolbar-flex yoo-toolbar-items-center yoo-toolbar-justify-between yoo-toolbar-mt-1">
            <span className="yoo-toolbar-text-xs">Background color</span>
          </div>
          <div className="yoo-toolbar-flex yoo-toolbar-items-center">
            {backgroundColors.map(([label, backgroundColor]) => (
              <button
                key={label}
                title={label}
                type="button"
                className="yoopta-button yoo-toolbar-w-[25px] yoo-toolbar-h-[25px] yoo-toolbar-rounded-md yoo-toolbar-mx-[2px] yoo-toolbar-my-[5px] yoo-toolbar-border yoo-toolbar-border-[#e3e3e3]"
                style={getItemStyles('backgroundColor', backgroundColor)}
                onClick={() => updateColor('backgroundColor', backgroundColor)}
              />
            ))}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export { HighlightColor };
