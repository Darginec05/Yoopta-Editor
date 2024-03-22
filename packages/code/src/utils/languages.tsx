import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { vue } from '@codemirror/lang-vue';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { angular } from '@codemirror/lang-angular';
import { rust } from '@codemirror/lang-rust';
import { xml } from '@codemirror/lang-xml';
import { yaml } from '@codemirror/lang-yaml';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { cpp } from '@codemirror/lang-cpp';

const LANGUAGES = {
  HTML: html(),
  CSS: css(),
  JavaScript: javascript({ jsx: true, typescript: true }),
  PHP: php(),
  'C++': cpp(),
  Java: java(),
  Python: python(),
  Markdown: markdown(),
  Rust: rust(),
  Vue: vue(),
  SQL: sql(),
  Angular: angular(),
  JSON: json(),
  XML: xml(),
  YAML: yaml(),
};

export { LANGUAGES };
