import { serializeHtml } from './html/serialize';
import { deserializeMarkdown } from './markdown/deserialize';
import { serializeMarkdown } from './markdown/serialize';
import { deserializeHtml } from './html/deserialize';

const markdown = { deserialize: deserializeMarkdown, serialize: serializeMarkdown };
const html = { deserialize: deserializeHtml, serialize: serializeHtml };

const yoptaExports = {
  markdown,
  html,
};

export { markdown, html };

export default yoptaExports;
