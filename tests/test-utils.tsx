import { render } from '@testing-library/react';
import React from 'react';
import { createYooptaEditor } from '../packages/core/editor/src/editor';
import { YooptaPlugin } from '../packages/core/editor/src/plugins';
import { YooptaEditor, YooptaEditorProps } from '../packages/core/editor/src/YooptaEditor';

export const InlinePlugin = new YooptaPlugin({
  type: 'Inline',
  elements: {
    inline: {
      render: (props) => <span {...props.attributes}>{props.children}</span>,
      props: { nodeType: 'inline' },
    },
  },
});

export const DefaultParagraph = new YooptaPlugin({
  type: 'Paragraph',
  elements: {
    paragraph: {
      render: (props) => <p {...props.attributes}>{props.children}</p>,
      props: { nodeType: 'block' },
    },
  },
  options: {
    shortcuts: ['p', 'text', 'para'],
    display: {
      title: 'Paragraph',
      description: 'Paragraph block',
    },
  },
});

export const BlockPluginWithProps = new YooptaPlugin({
  type: 'BlockPluginWithProps',
  elements: {
    block: {
      render: (props) => <div {...props.attributes}>{props.children}</div>,
      props: { nodeType: 'block', checked: false },
    },
  },
});

const PluginWithSeveralElements = new YooptaPlugin({
  type: 'PluginWithSeveralElements',
  elements: {
    'root-element': {
      render: (props) => <div {...props.attributes}>{props.children}</div>,
      props: { nodeType: 'inline' },
      children: ['first-child-element'],
    },
    'first-child-element': {
      render: (props) => <div {...props.attributes}>{props.children}</div>,
      props: { nodeType: 'block' },
      children: ['second-child-element'],
    },
    'second-child-element': {
      render: (props) => <div {...props.attributes}>{props.children}</div>,
      props: { nodeType: 'block' },
    },
  },
});

export const TEST_PLUGIN_LIST = [InlinePlugin, DefaultParagraph, BlockPluginWithProps, PluginWithSeveralElements];

const DEFAULT_EDITOR_STATE = {
  'aafd7597-1e9a-4c80-ab6c-88786595d72a': {
    id: 'aafd7597-1e9a-4c80-ab6c-88786595d72a',
    meta: { depth: 0, order: 0 },
    type: 'Paragraph',
    value: [
      {
        id: '3aff9e2c-5fee-43ff-b426-1e4fee8b303c',
        type: 'paragraph',
        props: { nodeType: 'block' },
        children: [{ text: '' }],
      },
    ],
  },
};

export function renderYooptaEditor(props: Partial<YooptaEditorProps> = {}) {
  const editor = props.editor || createYooptaEditor();

  return render(
    <YooptaEditor
      {...props}
      value={props.value || DEFAULT_EDITOR_STATE}
      editor={props.editor || editor}
      plugins={props.plugins || TEST_PLUGIN_LIST}
      autoFocus={props.autoFocus || false}
    />,
  );
}
