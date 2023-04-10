import { useMemo } from 'react';
import { Descendant } from 'slate';
import type { YoptaMark } from '@yopta/editor';
import { getChildren } from './components/RenderElement';
import uniqWith from 'lodash.uniqwith';
import { isElement } from './utils';

type Props = {
  className?: string;
  data: Descendant[];
  plugins: any[];
  marks: YoptaMark[];
};

export function mergePlugins(plugins) {
  const items = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, isChild: true }] : componentProps;
    })
    .flat();

  const uniquePlugins = uniqWith(items, (a, b) => a.type === b.type);
  return uniquePlugins;
}

const ElementWrapper = ({ children, element, attributes, nodeType, render }) => {
  const isInline = nodeType === 'inline';

  if (isInline) return render({ attributes, element, children });

  return (
    <div data-element-id={element.id} data-element-type={element.type} {...attributes}>
      {render({ attributes, element, children })}
    </div>
  );
};

const TextLeaf = ({ attributes, children, placeholder, leaf }) => {
  return (
    <span {...attributes} data-placeholder={placeholder}>
      {children}
    </span>
  );
};

const YoptaRenderer = (props: Props) => {
  const { className, data, plugins, marks } = props;

  const yoptaPlugins: any[] = useMemo(() => mergePlugins(plugins), [plugins]);

  const renderElement = useMemo(() => {
    return (props) => {
      for (let i = 0; i < yoptaPlugins.length; i++) {
        const plugin = yoptaPlugins[i];
        const renderFn = plugin.renderer.render ? plugin.renderer.render() : plugin.renderer(null);

        if (props.element.type === plugin.type) {
          return (
            <ElementWrapper
              element={props.element}
              attributes={props.attributes}
              nodeType={props.element.nodeType}
              render={renderFn}
              key={props.element.id}
            >
              {props.children}
            </ElementWrapper>
          );
        }
      }

      return null;
    };
  }, [yoptaPlugins]);

  const renderLeaf = useMemo(() => {
    return (leafProps) => {
      const props = { ...leafProps };

      yoptaPlugins.forEach((plugin) => {
        if (plugin.leaf) {
          const leafChildren = plugin.leaf(null)(props);
          if (leafChildren) props.children = leafChildren;
        }
      });

      marks.forEach((mark) => {
        if (props.leaf[mark.type]) {
          props.children = mark.render(props);
        }
      });

      return <TextLeaf {...props} />;
    };
  }, [yoptaPlugins]);

  const renderProps = {
    node: { children: data },
    renderElement: renderElement,
    renderLeaf: renderLeaf,
  };

  return (
    <div id="yopta-editor" className={className}>
      {getChildren(renderProps)}
    </div>
  );
};

export { YoptaRenderer };
