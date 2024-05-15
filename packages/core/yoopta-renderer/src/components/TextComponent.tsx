import { Leaf } from './Leaf';

type Props = { isLast: boolean; parent: Element; renderLeaf: () => any; text: any };

const TextComponent = (props: Props) => {
  const { isLast, parent, renderLeaf, text } = props;
  const leaves = [{ ...text }];
  const children: any[] = [];

  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];

    children.push(
      <Leaf
        isLast={isLast && i === leaves.length - 1}
        key={i}
        leaf={leaf}
        text={text}
        parent={parent}
        renderLeaf={renderLeaf}
      />,
    );
  }

  return <span>{children}</span>;
};

export { TextComponent };
