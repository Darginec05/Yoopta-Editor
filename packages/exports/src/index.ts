import { deserializeHtml } from './html/deserialize';
import { serializeHtml } from './html/serialize';
import { deserializeMarkdown } from './markdown/deserialize';
import { serializeMarkdown } from './markdown/serialize';

const markdown = { deserialize: deserializeMarkdown, serialize: serializeMarkdown };
const html = { deserialize: deserializeMarkdown, serialize: serializeHtml };

const yoptaExports = {
  markdown,
  html,
};

export { markdown, html };

export default yoptaExports;
