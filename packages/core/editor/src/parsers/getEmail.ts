import { Paths } from '../editor/paths';
import { SlateElement, YooEditor, YooptaContentValue } from '../editor/types';
import { getPluginByInlineElement } from '../utils/blockElements';

const MARKS_NODE_NAME_MATCHERS_MAP = {
  underline: { type: 'underline', tag: 'U' },
  strike: { type: 'strike', tag: 'S' },
  code: { type: 'code', tag: 'CODE' },
  italic: { type: 'italic', tag: 'I' },
  bold: { type: 'bold', tag: 'B' },
  mark: { type: 'mark', tag: 'MARK' },
};

function serializeChildren(children, plugins) {
  return children
    .map((child) => {
      let innerHtml = '';

      if (child.text) {
        innerHtml = Object.keys(MARKS_NODE_NAME_MATCHERS_MAP).reduce((acc, mark) => {
          console.log('mark', mark);
          if (child[mark]) {
            return `<${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>${acc}</${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>`;
          }
          return acc;
        }, child.text);

        return innerHtml;
      } else if (child.type) {
        const childPlugin = getPluginByInlineElement(plugins, child.type);

        if (childPlugin && childPlugin.parsers?.html?.serialize) {
          // We don't pass block meta data to this because it's inline element inside block
          innerHtml = childPlugin.parsers.html.serialize(child, serializeChildren(child.children, plugins));
          return innerHtml;
        }
      }

      return innerHtml;
    })
    .join('');
}

type ElementStyles = {
  style?: Partial<CSSStyleDeclaration>;
  className?: string;
  attributes?: Record<string, string>;
};

type PluginEmailStyles<T extends Record<string, unknown>> = {
  [K in keyof T]: ElementStyles;
};

export type EmailStyleOptions<TPlugins extends Record<string, Record<string, unknown>>> = {
  head: {
    fonts?: string | string[];
    styles?: string;
    meta?: Record<string, string>;
  };
  body: {
    attributes?: string;
    style?: Partial<CSSStyleDeclaration>;
    className?: string;
    width?: number | string;
  };
  plugins?: {
    [K in keyof TPlugins]?: PluginEmailStyles<TPlugins[K]['elements']>;
  };
  customTemplate?: (content: string) => string;
};

const DEFAULT_OPTIONS: EmailStyleOptions = {
  head: {
    fonts: '',
    styles: '.ExternalClass {width: 100%;}',
    meta: {
      'content-type': 'text/html; charset=UTF-8',
      'x-apple-disable-message-reformatting': '',
    },
  },
  body: {
    style: {
      margin: '0 auto',
      padding: '10px 20px',
      width: '600px',
      fontFamily: "'Montserrat', sans-serif",
    },
  },
};

export function getEmail(editor: YooEditor, content: YooptaContentValue, opts?: Partial<EmailStyleOptions>): string {
  const blocks = Object.values(content)
    .filter((item) => {
      const selectedBlocks = Paths.getSelectedPaths(editor);

      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0) {
        return selectedBlocks?.includes(item.meta.order);
      }

      return true;
    })
    .sort((a, b) => a.meta.order - b.meta.order);

  const email = blocks.map((blockData) => {
    const plugin = editor.plugins[blockData.type];

    if (plugin && plugin.parsers?.email?.serialize) {
      const content = serializeChildren((blockData.value[0] as SlateElement).children, editor.plugins);
      return plugin.parsers.email.serialize(blockData.value[0] as SlateElement, content, blockData.meta);
    }

    return '';
  });

  const emailContent = email.join('');
  const options = deepMerge(DEFAULT_OPTIONS, opts || {});

  if (options.customTemplate) {
    return options.customTemplate(emailContent);
  }

  const metaTags = Object.entries(options.head.meta || {})
    .map(([name, content]) => `<meta name="${name}" content="${content}" />`)
    .join('\n');

  const fonts = Array.isArray(options.head.fonts) ? options.head.fonts.join('\n') : options.head.fonts;
  console.log('fonts', fonts);
  const bodyAttributes = options.body.attributes ? ` ${options.body.attributes}` : '';
  const bodyClass = options.body.className ? ` class="${options.body.className}"` : '';
  const bodyStyle = objectToCssString({
    ...DEFAULT_OPTIONS.body.style,
    ...options.body.style,
  });

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" lang="en">

      <head>
        ${metaTags}
        ${fonts}
        <style type="text/css">
          ${options.head.styles}
        </style>
      </head>
        <body style="${bodyStyle}"${bodyAttributes}${bodyClass} id="yoopta-clipboard" data-editor-id="${editor.id}">
          ${emailContent}
        </body>
      </html>
  `;
}

function objectToCssString(styles: Partial<CSSStyleDeclaration>): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join(';');
}

function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };

  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value as any;
    }
  });

  return result;
}
