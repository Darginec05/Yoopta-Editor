import YooptaEditor, { createYooptaEditor, YooEditor, YooptaBlockData, YooptaContentValue } from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '5230b61e-95d7-47e9-b460-4846644789c1': {
      id: '5230b61e-95d7-47e9-b460-4846644789c1',
      value: [
        {
          id: '171a383f-d2ca-4faf-ad74-aed24fb44c99',
          type: 'code',
          props: {
            nodeType: 'void',
            language: 'javascript',
            theme: 'VSCode',
          },
          children: [
            {
              text: "import { YooEditor, YooptaBlockData, SlateElement, YooptaContentValue } from '@yoopta/editor';\n\nexport function getPluginByInlineElement(plugins: YooEditor['plugins'], elementType: string) {\n  const plugin = Object.values(plugins).find((plugin) => plugin.type === plugin.elements?.[elementType].rootPlugin);\n  return plugin;\n}\n\nconst MARKS_NODE_NAME_MATCHERS_MAP = {\n  underline: { type: 'underline', tag: 'U' },\n  strike: { type: 'strike', tag: 'S' },\n  code: { type: 'code', tag: 'CODE' },\n  italic: { type: 'italic', tag: 'I' },\n  bold: { type: 'bold', tag: 'B' },\n};\n\nfunction serializeChildren(children, plugins) {\n  return children\n    .map((child) => {\n      let innerHtml = '';\n\n      if (child.text) {\n        innerHtml = Object.keys(MARKS_NODE_NAME_MATCHERS_MAP).reduce((acc, mark) => {\n          if (child[mark]) {\n            return `<${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>${acc}</${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>`;\n          }\n          return acc;\n        }, child.text);\n\n        return innerHtml;\n      } else if (child.type) {\n        const childPlugin = getPluginByInlineElement(plugins, child.type);\n\n        if (childPlugin && childPlugin.parsers?.html?.serialize) {\n          innerHtml = childPlugin.parsers.html.serialize(child, serializeChildren(child.children, plugins));\n          return innerHtml;\n        }\n      }\n\n      return innerHtml;\n    })\n    .join('');\n}\n\nexport function serialize(editor: YooEditor, blocksData: YooptaBlockData[]) {\n  const blocks = blocksData.sort((a, b) => a.meta.order - b.meta.order);\n\n  const html = blocks.map((blockData) => {\n    const plugin = editor.plugins[blockData.type];\n\n    if (plugin && plugin.parsers?.html?.serialize) {\n      const content = serializeChildren(blockData.value[0].children, editor.plugins);\n      const text = plugin.parsers.html.serialize(blockData.value[0] as SlateElement, content);\n      return `${text}\\n`;\n    }\n\n    return '';\n  });\n\n  return `<body id=\"yoopta-clipboard\" data-editor-id=\"${editor.id}\">${html.join('')}</body>`;\n}\n\nexport function serializeHTML(editor: YooEditor, content: YooptaContentValue) {\n  const selectedBlocks = Object.values(content);\n  return serialize(editor, selectedBlocks);\n}\n",
            },
          ],
        },
      ],
      type: 'Code',
      meta: {
        order: 0,
        depth: 0,
      },
    },
  });

  useEffect(() => {
    editor.on('change', (data) => setValue(data));
  }, []);

  return (
    <form className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={YOOPTA_PLUGINS}
        selectionBoxRoot={selectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        style={{ width: 750 }}
        value={value}
      />
    </form>
  );
};

export default BasicExample;
