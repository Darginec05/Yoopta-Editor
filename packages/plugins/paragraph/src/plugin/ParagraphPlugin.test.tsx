import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Paragraph } from './';
import { renderYooptaEditor } from 'test-utils';

const plugins = [Paragraph];

describe('Paragraph Plugin', () => {
  it('renders correctly with basic props', () => {
    const { container } = renderYooptaEditor({ plugins });

    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
    expect(paragraph.textContent).toBe('Test content');
  });

  it('applies custom classes and attributes', () => {
    const customProps = {
      className: 'custom-class',
      style: { textAlign: 'center' },
      attributes: { 'data-testid': 'paragraph' },
    };
    render(<Paragraph editor={editor} {...customProps} children="Test content" />);
    const paragraph = screen.getByTestId('paragraph');
    expect(paragraph).toHaveClass('custom-class');
    expect(paragraph).toHaveStyle({ textAlign: 'center' });
  });

  it('handles extendRender prop', () => {
    const extendedRender = vi.fn(({ children }) => <div>{children}</div>);
    render(
      <Paragraph
        editor={editor}
        extendRender={extendedRender}
        children="Extended content"
        attributes={{ 'data-testid': 'extended' }}
      />,
    );
    expect(extendedRender).toHaveBeenCalled();
    const extendedElement = screen.getByTestId('extended');
    expect(extendedElement.textContent).toBe('Extended content');
  });

  it('serializes to HTML correctly', () => {
    const element = { type: 'paragraph', children: [{ text: 'Hello world' }] };
    const text = 'Hello world';
    const serializedOutput = Paragraph.parsers.html.serialize(element, text);
    expect(serializedOutput).toBe('<p>Hello world</p>');
  });

  it('deserializes from HTML correctly', () => {
    document.body.innerHTML = `<p>Hello world</p>`;
    const pElement = document.querySelector('p');
    const deserializedOutput = Paragraph.parsers.html.deserialize.nodeNames.includes(pElement.nodeName);
    expect(deserializedOutput).toBeTruthy();
  });

  it('serializes to Markdown correctly', () => {
    const element = { type: 'paragraph', children: [{ text: 'Hello world' }] };
    const text = 'Hello world';
    const serializedMarkdown = Paragraph.parsers.markdown.serialize(element, text);
    expect(serializedMarkdown).toBe('Hello world\n');
  });
});
