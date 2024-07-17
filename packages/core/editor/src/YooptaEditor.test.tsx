import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YooptaEditor } from './YooptaEditor';
import { YooptaPlugin } from './plugins';
import { createYooptaEditor } from './editor';

const fakePlugin = new YooptaPlugin({
  type: 'Test',
  elements: {
    test: {
      render: (props) => <div {...props.attributes}>{props.children}</div>,
      props: { nodeType: 'block' },
    },
  },
});

const paragraphPlugin = new YooptaPlugin({
  type: 'Paragraph',
  elements: {
    paragraph: {
      render: (props) => <p {...props.attributes}>{props.children}</p>,
      props: { nodeType: 'block' },
    },
  },
});

const plugins = [fakePlugin, paragraphPlugin];

describe('YooptaEditor Component', () => {
  it('renders correctly with minimum props', () => {
    const editor = createYooptaEditor();
    render(<YooptaEditor editor={editor} plugins={plugins} />);

    expect(screen.getByTestId('yoopta-editor')).toBeInTheDocument();
  });

  it('applies className and style correctly', () => {
    const style = { width: '500px' };
    const className = 'custom-class';
    const editor = createYooptaEditor();

    render(<YooptaEditor editor={editor} plugins={plugins} className={className} style={style} />);

    const editorEl = screen.getByTestId('yoopta-editor');
    expect(editorEl).toHaveClass(className);
    expect(editorEl).toHaveStyle(style);
  });

  it('validates initial value and handles invalid data gracefully', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidValue = 'this is not a valid value';
    const editor = createYooptaEditor();

    render(<YooptaEditor editor={editor} plugins={plugins} value={invalidValue} />);
    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });

  it('displays a warning for legacy data usage', () => {
    const editor = createYooptaEditor();

    const value = [{ id: 'old-format', nodeType: 'old' }];
    render(<YooptaEditor editor={editor} plugins={plugins} value={value} />);

    expect(screen.getByText(/legacy version of the Yoopta-Editor is used/i)).toBeInTheDocument();
  });
});
