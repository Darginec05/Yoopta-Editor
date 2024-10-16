import { Editor } from './components/Editor/Editor';
import { CSSProperties, useMemo, useState } from 'react';
import { SlateElement, YooEditor, YooptaBlockData, YooptaContentValue } from './editor/types';
import { Tools } from './contexts/YooptaContext/ToolsContext';
import { YooptaPlugin } from './plugins';
import { YooptaMark } from './marks';
import { YooptaEditorProvider } from './YooptaEditorProvider';

type Props = {
  id?: string;
  editor: YooEditor;
  plugins: Readonly<YooptaPlugin<Record<string, SlateElement>>[]>;
  marks?: YooptaMark<any>[];
  value?: YooptaContentValue;
  autoFocus?: boolean;
  className?: string;
  selectionBoxRoot?: HTMLElement | React.MutableRefObject<HTMLElement | null> | false;
  children?: React.ReactNode;
  tools?: Partial<Tools>;
  placeholder?: string;
  readOnly?: boolean;
  width?: number | string;
  style?: CSSProperties;
};

const YooptaEditor = ({
  id,
  editor,
  value,
  marks,
  plugins,
  autoFocus,
  className,
  tools,
  selectionBoxRoot,
  children,
  placeholder,
  readOnly,
  width,
  style,
}: Props) => {
  return (
    <YooptaEditorProvider
      id={id}
      editor={editor}
      value={value}
      marks={marks}
      plugins={plugins}
      tools={tools}
      readOnly={readOnly}
    >
      <Editor
        placeholder={placeholder}
        marks={marks}
        autoFocus={autoFocus}
        className={className}
        selectionBoxRoot={selectionBoxRoot}
        width={width}
        style={style}
      >
        {children}
      </Editor>
    </YooptaEditorProvider>
  );
};
export { YooptaEditor };
