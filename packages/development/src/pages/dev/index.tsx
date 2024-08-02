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
    'd27abcd2-a26b-4f97-add6-993d655d488a': {
      id: 'd27abcd2-a26b-4f97-add6-993d655d488a',
      value: [
        {
          id: '5168cba7-4313-4f49-b67a-14cab88c089c',
          type: 'code',
          props: {
            nodeType: 'void',
            language: '',
            theme: 'VSCode',
          },
          children: [
            {
              text: '<?php\n$cookie_name = "user";\n$cookie_value = "Alex Porter";\nsetcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");\n?>\n\n<?php\nif(!isset($_COOKIE[$cookie_name])) {\n     echo "Cookie named \'" . $cookie_name . "\' is not set!";\n} else {\n     echo "Cookie \'" . $cookie_name . "\' is set!<br>";\n     echo "Value is: " . $_COOKIE[$cookie_name];\n}\n?>\n',
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

  console.log(value);

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
