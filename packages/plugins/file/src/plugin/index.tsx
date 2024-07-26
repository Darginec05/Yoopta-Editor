import { generateId, YooptaPlugin } from '@yoopta/editor';
import { FileElementProps, FilePluginElements, FilePluginOptions } from '../types';
import { FileRender } from '../ui/File';

const ALIGNS_TO_JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const File = new YooptaPlugin<FilePluginElements, FileElementProps, FilePluginOptions>({
  type: 'File',
  elements: {
    file: {
      render: FileRender,
      props: {
        size: 0,
        name: null,
        src: null,
        format: null,
        nodeType: 'void',
      },
    },
  },
  options: {
    display: {
      title: 'File',
      description: 'For file videos, google maps and more',
    },
    accept: '',
    // onUpload: async () => Promise.resolve({ src: '' }),
  },
  parsers: {
    html: {
      serialize: (element, text, blockMeta) => {
        const { align = 'center', depth = 0 } = blockMeta || {};
        const justify = ALIGNS_TO_JUSTIFY[align] || 'center';

        return `<div style="margin-left: ${depth}px; display: flex; width: 100%; justify-content: ${justify}"><a data-meta-align="${align}" data-meta-depth="${depth}" href="${
          element.props.src
        }" data-size="${element.props.size}" download="${
          element.props.name
        }" target="_blank" rel="noopener noreferrer">${
          element.props.format ? `${element.props.name}.${element.props.format}` : `${element.props.name}`
        }</a></div>`;
      },
      deserialize: {
        nodeNames: ['A'],
        parse: (el) => {
          if (el.nodeName === 'A') {
            const hasDownloadAttr = !!el.getAttribute('download');
            const href = el.getAttribute('href');

            if (!hasDownloadAttr) return;
            if (!href) return;

            const url = new URL(href);

            const name = el.textContent || '';
            const format = name.split('.').pop();
            const src = url.href;
            const size = Number(el.dataset.size || 0);

            return {
              id: generateId(),
              type: 'file',
              children: [{ text: '' }],
              props: {
                name,
                format,
                src,
                size,
              },
            };
          }
        },
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `[${element.props.name}](${element.props.src})`;
      },
    },
  },
});

export { File };
