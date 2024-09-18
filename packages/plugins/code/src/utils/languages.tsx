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

import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';

const LANGUAGES_MAP = {
  javascript: {
    type: 'javascript',
    name: 'JavaScript',
    extension: javascript({ jsx: true, typescript: true }),
  },
  css: {
    type: 'css',
    name: 'CSS',
    extension: css(),
  },
  php: {
    type: 'php',
    name: 'PHP',
    extension: php(),
  },
  python: {
    type: 'python',
    name: 'Python',
    extension: python(),
  },
  markdown: {
    type: 'markdown',
    name: 'Markdown',
    extension: markdown(),
  },
  vue: {
    type: 'vue',
    name: 'Vue',
    extension: vue(),
  },
  json: {
    type: 'json',
    name: 'JSON',
    extension: json(),
  },
  sql: {
    type: 'sql',
    name: 'SQL',
    extension: sql(),
  },
  angular: {
    type: 'angular',
    name: 'Angular',
    extension: angular(),
  },
  rust: {
    type: 'rust',
    name: 'Rust',
    extension: rust(),
  },
  xml: {
    type: 'xml',
    name: 'XML',
    extension: xml(),
  },
  yaml: {
    type: 'yaml',
    name: 'YAML',
    extension: yaml(),
  },
  java: {
    type: 'java',
    name: 'Java',
    extension: java(),
  },
  html: {
    type: 'html',
    name: 'HTML',
    extension: html(),
  },
  cpp: {
    type: 'cpp',
    name: 'C++',
    extension: cpp(),
  },
  bash: {
    type: 'bash',
    name: 'Bash',
    extension: StreamLanguage.define(shell),
  },
  shell: {
    type: 'shell',
    name: 'Shell',
    extension: StreamLanguage.define(shell),
  },
};

export { LANGUAGES_MAP };
