import { render, screen } from '@testing-library/react';

import { YoptaEditor } from './YoptaEditor';

describe('App', () => {
  it('renders headline', () => {
    render(<YoptaEditor value={[]} onChange={() => {}} />);

    screen.debug();
  });
});
