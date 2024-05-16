import { render, screen } from '@testing-library/react';

import { YooptaEditor } from './YooptaEditor';

describe('Yoopta Editor', () => {
  it('renders yoopta editor', () => {
    const { container } = render(<YooptaEditor value={[]} onChange={() => {}} />);

    expect(container).toBeInTheDocument();
  });

  it('renders yoopta tools', () => {
    const { container } = render(<YooptaEditor value={[]} onChange={() => {}} />);

    const toolbar = container.querySelector('.yoopta-toolbar');
    const suggestionList = container.querySelector('.yoopta-suggestion_list');

    expect(toolbar).toBeInTheDocument();
    expect(suggestionList).toBeInTheDocument();
  });
});
