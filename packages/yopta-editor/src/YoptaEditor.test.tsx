import { render, screen } from '@testing-library/react';

import { YoptaEditor } from './YoptaEditor';

describe('Yopta Editor', () => {
  it('renders yopta editor', () => {
    const { container } = render(<YoptaEditor value={[]} onChange={() => {}} />);

    expect(container).toBeInTheDocument();
  });

  it('renders yopta tools', () => {
    const { container } = render(<YoptaEditor value={[]} onChange={() => {}} />);

    const toolbar = container.querySelector('.yopta-toolbar');
    const suggestionList = container.querySelector('.yopta-suggestion_list');

    expect(toolbar).toBeInTheDocument();
    expect(suggestionList).toBeInTheDocument();
  });
});
