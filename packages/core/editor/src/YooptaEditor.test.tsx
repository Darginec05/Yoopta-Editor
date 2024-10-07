import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderYooptaEditor } from 'test-utils';

describe('YooptaEditor Component', () => {
  it('renders correctly with minimum props', () => {
    renderYooptaEditor();

    expect(screen.getByTestId('yoopta-editor')).toBeInTheDocument();
  });

  it('applies className and style correctly', () => {
    const style = { width: '500px' };
    const className = 'custom-class';
    renderYooptaEditor({ className, style });

    const editorEl = screen.getByTestId('yoopta-editor');
    expect(editorEl).toHaveClass(className);
    expect(editorEl).toHaveStyle(style);
  });

  it('validates initial value and handles invalid data gracefully', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidValue = 'this is not a valid value';
    renderYooptaEditor({ value: invalidValue });

    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });

  it('displays a warning for legacy data usage', () => {
    const value = [{ id: 'old-format', nodeType: 'old' }];
    renderYooptaEditor({ value });

    expect(screen.getByText(/legacy version of the Yoopta-Editor is used/i)).toBeInTheDocument();
  });
});
