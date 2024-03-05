import { PluginElement, PluginElementsMap } from '../plugins/types';

export function getRootBlockElement(
  elems: PluginElementsMap<string, unknown> | undefined,
): PluginElement<unknown> | undefined {
  if (!elems) return;

  const elements = Object.values(elems);
  const rootElement = elements.length === 1 ? elements[0] : elements.find((el) => el.asRoot);

  return rootElement;
}
