import { serializeHTML } from './html/serialize';
import { deserializeHTML } from './html/deserialize';
import { deserializeMarkdown } from './markdown/deserialize';
import { serializeMarkdown } from './markdown/serialize';
import { deserializeText } from './text/deserialize';
import { serializeText } from './text/serialize';
import { serializeEmail } from './email/serialize';

const markdown = { deserialize: deserializeMarkdown, serialize: serializeMarkdown };
const html = { deserialize: deserializeHTML, serialize: serializeHTML };
const plainText = { deserialize: deserializeText, serialize: serializeText };
const email = { serialize: serializeEmail };

const yooptaExports = {
  markdown,
  html,
  plainText,
  email,
};

export { markdown, html, plainText, email };

export default yooptaExports;
