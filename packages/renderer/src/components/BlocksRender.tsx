import { useMemo } from 'react';
import { buildPlugins } from '../utils/builders';
import { BlockRender } from './BlockRender';
import { SlateRender } from './SlateRender';

const DEFAULT_EDITOR_KEYS = [];

const BlocksRender = ({ value, plugins: pluginsProp, marks }) => {
  const plugins = useMemo(() => buildPlugins(pluginsProp), [pluginsProp]);

  const childrenUnorderedKeys = Object.keys(value);
  const childrenKeys = useMemo(() => {
    if (childrenUnorderedKeys.length === 0) return DEFAULT_EDITOR_KEYS;

    return childrenUnorderedKeys.sort((a, b) => {
      const aOrder = value[a].meta.order;
      const bOrder = value[b].meta.order;

      return aOrder - bOrder;
    });

    //[TODO] - unnecesary
  }, [childrenUnorderedKeys]);

  const blocks: JSX.Element[] = [];

  for (let i = 0; i < childrenKeys.length; i++) {
    const childrenId = childrenKeys[i];
    const block = value[childrenId];
    const plugin = plugins[block.type];

    if (!block || !plugin) {
      console.error(`Plugin ${block.type} not found`);
      continue;
    }

    blocks.push(
      <BlockRender key={childrenId} block={block} blockId={childrenId}>
        <SlateRender
          id={block.id}
          value={block.value}
          block={block}
          marks={marks}
          elements={plugin.elements}
          options={plugin.options}
        />
      </BlockRender>,
    );
  }

  return <>{blocks}</>;
};

export { BlocksRender };
