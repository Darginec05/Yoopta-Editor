import { Key, useMemo } from 'react';
import { Descendant } from 'slate';
import { YoptaBaseElement } from '../../types';
import { YoptaMark } from '../../utils/marks';
import { YoptaPlugin } from '../../utils/plugins';
import { getRenderFunctionFactory } from '../Editor/utils';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';

type Props = {
  data: Descendant[];
  key?: Key;
  className?: string;
  plugins: YoptaPlugin<any, YoptaBaseElement<string>>[];
  marks: YoptaMark[];
};

const RenderElement = ({ element, render, marks }) => {
  return <div>element</div>;
};

const RenderChildren = (props) => {
  return <span>children</span>;
};

const isText = (value: any) => {
  return typeof value === 'object' && typeof value.text === 'string';
};

const isElement = (value: any) => {
  return typeof value === 'object' && typeof value.type === 'string' && typeof value.id === 'string';
};

const YoptaRender = (props: Props) => {
  const { key, className, data, plugins } = props;

  const PLUGIN_MAP = useMemo(() => {
    const map = {};

    plugins.forEach((plugin) => {
      const { type, renderer } = plugin.getPlugin;

      map[type] = { type, renderer };
    });

    return map;
  }, [plugins]);

  const renderElement = () => {
    const elements = [];

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const plugin = PLUGIN_MAP[element.type];

      if (plugin) {
        const render = getRenderFunctionFactory(plugin, true)(null, null);
        elements.push(<RenderElement element={element} render={render} marks={props.marks} />);
      }
    }

    return elements;
  };

  return (
    <div key={key} className={className}>
      {renderElement()}
    </div>
  );
};

export { YoptaRender };
