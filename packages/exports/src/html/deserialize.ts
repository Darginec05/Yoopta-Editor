import { generateId, YoptaBaseElement, YoptaPluginType } from '@yopta/editor';
import { Text } from 'slate';
import { jsx } from 'slate-hyperscript';
import { mergePluginTypesToMapHMTLNodeName } from '../utils/mergePlugins';

// Define the deserialize function
// const deserialize = (
//   el: HTMLElement | ChildNode,
//   pluginsMap: Record<YoptaBaseElement<string>['type'], YoptaPluginType<any, YoptaBaseElement<string>>>,
// ) => {
//   if (el.nodeType === 3) {
//     return el.textContent;
//   } else if (el.nodeType !== 1) {
//     return null;
//   }

//   const children = Array.from(el.childNodes)
//     .map((child) => deserialize(child, pluginsMap))
//     .flat();

//   // console.log('el.nodeName', el.nodeName);
//   // console.log('pluginsMap', pluginsMap);
//   const plugin = pluginsMap[el.nodeName];

//   if (plugin) {
//     console.log('el.nodeName', el.nodeName);
//     return jsx('element', plugin.defineElement(), children);
//   }

//   switch (el.nodeName) {
//     case 'BODY':
//       return jsx('fragment', {}, children);
//     case 'BR':
//       return '\n';
//     case 'BLOCKQUOTE':
//       return jsx('element', { type: 'block-quote' }, children);
//     case 'UL':
//       return jsx('element', { type: 'bulleted-list' }, children);
//     case 'OL':
//       return jsx('element', { type: 'numbered-list' }, children);
//     case 'LI':
//       return jsx('element', { type: 'list-item' }, children);
//     case 'P':
//       return jsx('element', { type: 'paragraph' }, children);
//     case 'H1':
//       return jsx('element', { type: 'heading-one' }, children);
//     case 'H2':
//       return jsx('element', { type: 'heading-two' }, children);
//     case 'H3':
//       return jsx('element', { type: 'heading-three' }, children);
//     case 'H4':
//       return jsx('element', { type: 'heading-four' }, children);
//     case 'H5':
//       return jsx('element', { type: 'heading-five' }, children);
//     case 'H6':
//       return jsx('element', { type: 'heading-six' }, children);
//     case 'STRONG':
//       return jsx('element', { type: 'bold' }, children);
//     case 'EM':
//       return jsx('element', { type: 'italic' }, children);
//     case 'CODE':
//       return jsx('element', { type: 'code' }, children);
//     case 'PRE':
//       return jsx('element', { type: 'code' }, children);
//     case 'A':
//       return jsx('element', { type: 'link', url: el.href }, children);
//     default:
//       // return jsx('element', { type: 'paragraph' }, children);
//       console.log('children', children);

//       return children;
//   }
// };

const TEXT_TAGS = {
  // CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

const deserialize = (
  el: HTMLElement | ChildNode,
  pluginsMap: Record<YoptaBaseElement<string>['type'], YoptaPluginType<any, YoptaBaseElement<string>>>,
) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  let children = Array.from(parent.childNodes)
    .map((node) => deserialize(node, pluginsMap))
    .flat();

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (pluginsMap[nodeName]) {
    const plugin = pluginsMap[nodeName];

    if (plugin) {
      let node = plugin.defineElement();

      if (typeof plugin.exports?.html.deserialize.parse === 'function') {
        const data = plugin.exports?.html.deserialize.parse(el as HTMLElement);
        node = { ...node, data };
      }

      return jsx('element', node, children);
    }
  }

  if (Text.isTextList(children)) {
    return jsx('element', pluginsMap.P.defineElement(), children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    const textNodes = children.map((child) => {
      return Text.isText(child) ? jsx('text', attrs, child) : child;
    });

    return textNodes;
  }

  return children;
};

export function deserializeHtml(htmlString: string, plugins: YoptaPluginType<unknown, YoptaBaseElement<string>>[]) {
  const pluginsMap = mergePluginTypesToMapHMTLNodeName(plugins);
  console.log('pluginsMap', pluginsMap);

  const parsedHtml = new DOMParser().parseFromString(htmlString, 'text/html');
  return deserialize(parsedHtml.body, pluginsMap);
}
