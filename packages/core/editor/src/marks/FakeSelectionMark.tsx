import { createYooptaMark } from '.';
import { YooptaMarkProps } from '../plugins/types';

type FakeSelectionMarkProps = YooptaMarkProps<'italic', boolean>;

const FakeSelectionMark = createYooptaMark({
  type: 'fakeSelection',
  render: (props: FakeSelectionMarkProps) => {
    return <span style={{ backgroundColor: '#d7e6fa' }}>{props.children}</span>;
  },
});

export { FakeSelectionMark };
