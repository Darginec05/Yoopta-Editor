import { Descendant } from 'slate';

type Props = {
  data: Descendant[];
  wrapCls?: string;
};

const YoptaRenderer = ({ data, wrapCls }: Props) => {
  console.log(data);

  return (
    <div className={wrapCls}>
      <div>YoptaRenderer</div>
    </div>
  );
};

export { YoptaRenderer };
