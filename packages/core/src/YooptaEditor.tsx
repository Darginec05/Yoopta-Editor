import EventEmitter from 'eventemitter3';
import { UltraYooptaContextProvider } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { getDefaultYooptaChildren } from './components/Editor/utils';
import { Editor } from './components/Editor/Editor';
import { useMemo, useState } from 'react';
import { YooEditor, YooptaBlockData, YooptaChildrenValue } from './editor/types';
import { PluginReturn } from './plugins/types';
import NoSSR from './components/NoSsr/NoSsr';
import { Tools, ToolsProvider } from './contexts/UltraYooptaContext/ToolsContext';
import {
  buildBlocks,
  buildBlockShortcuts,
  buildBlockSlateEditors,
  buildMarks,
  buildPlugins,
} from './utils/editorBuilders';
import { YooptaPlugin } from './plugins';
import { YooptaMark } from './marks';
import { FakeSelectionMark } from './marks/FakeSelectionMark';

type Props = {
  editor: YooEditor;
  plugins: YooptaPlugin[];
  marks?: YooptaMark<any>[];
  value?: YooptaChildrenValue;
  autoFocus?: boolean;
  className?: string;
  selectionBoxRoot?: HTMLElement | null | React.MutableRefObject<HTMLElement | null>;
  children?: React.ReactNode;
  tools?: Partial<Tools>;
};

const DEFAULT_VALUE: Record<string, YooptaBlockData> = getDefaultYooptaChildren();
const eventEmitter = new EventEmitter();

const Events = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};

function isValidateInitialValue(value: any): boolean {
  if (!value) return false;
  if (typeof value !== 'object') return false;
  if (Object.keys(value).length === 0) return false;

  return true;
}

const VALUES = {
  KHF9aakNp1INUmXAKS4JE: {
    id: 'KHF9aakNp1INUmXAKS4JE',
    value: [
      {
        id: 'fd3_68eQjOTABJOZr8yzt',
        type: 'paragraph',
        children: [
          {
            text: 's asdadsa das dsaa sadasasddas s',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  cDa2jUsaTFieliDawr4ii: {
    id: 'cDa2jUsaTFieliDawr4ii',
    value: [
      {
        id: 'NuQr2bCo1JS-eV_TltZO0',
        type: 'paragraph',
        children: [
          {
            text: 'as ddassadasdsaddsasadasdsadsadsda dasd sadsadadsdsdsadsa as das ',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  lO4Rk_pd3De0UEbCLX0qP: {
    id: 'lO4Rk_pd3De0UEbCLX0qP',
    value: [
      {
        id: 'RbZHT0TSjCrEQBqS2xvNC',
        type: 'paragraph',
        children: [
          {
            text: 'asdas dsadasd asd sad',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 2,
      depth: 0,
    },
  },
  '3BCXlvVkaVsyeUVdPJcSn': {
    id: '3BCXlvVkaVsyeUVdPJcSn',
    value: [
      {
        id: 'hWVTg1VzeYVTw6qVh4waH',
        type: 'heading-one',
        children: [
          {
            text: 'asdasdasddasdas',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingOne',
    meta: {
      order: 3,
      depth: 0,
    },
  },
  'vz2sYqpml0-QGtMeK3J1q': {
    id: 'vz2sYqpml0-QGtMeK3J1q',
    value: [
      {
        id: 'SpoDyAyXqRX4sLe_Ula-t',
        type: 'paragraph',
        children: [
          {
            text: 'd asdsad',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  mL0d98QC_RAkI_v7TNvlp: {
    id: 'mL0d98QC_RAkI_v7TNvlp',
    value: [
      {
        id: 'yjyxpj4xgXpK-KZGWxRIu',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 5,
      depth: 0,
    },
  },
  V7ivNvNhp9Wnb_aRz_hyf: {
    id: 'V7ivNvNhp9Wnb_aRz_hyf',
    value: [
      {
        id: 'BqWmQwCWHFoh9m1CZ7rJN',
        type: 'heading-two',
        children: [
          {
            text: 'asdasdasasd ad as dsad asd ',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 6,
      depth: 0,
    },
  },
  '79uvnCSHTT4Syf9kPcENo': {
    id: '79uvnCSHTT4Syf9kPcENo',
    value: [
      {
        id: 'nvDbGtJTxWGVmlGAV2LLA',
        type: 'paragraph',
        children: [
          {
            text: 'asdsad asd as',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '2J7-d1xW5oQvXmwhMY44p': {
    id: '2J7-d1xW5oQvXmwhMY44p',
    value: [
      {
        id: 'SwDKXkSPfz-wFNuK6sFZ0',
        type: 'paragraph',
        children: [
          {
            text: 'd a',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  wYXX5rafQ9ceGDHodhHkZ: {
    id: 'wYXX5rafQ9ceGDHodhHkZ',
    value: [
      {
        id: 'HBjVWhtrXhScFw2J8nIXr',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 9,
      depth: 0,
    },
  },
  Th9d5lRAfnWkXNMTQHunk: {
    id: 'Th9d5lRAfnWkXNMTQHunk',
    value: [
      {
        id: '54Ifw1xOvMihNJG-77PHB',
        type: 'heading-one',
        children: [
          {
            text: 'asdasddasddsaddas asdasdsad sad sa asdsadasa dasd',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingOne',
    meta: {
      order: 10,
      depth: 0,
    },
  },
  b5rXRmlvFdcp3da5Bl5t7: {
    id: 'b5rXRmlvFdcp3da5Bl5t7',
    value: [
      {
        id: '_PGl9JKSC55g-cCBytHtH',
        type: 'paragraph',
        children: [
          {
            text: 'as dasdasdass',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 11,
      depth: 0,
    },
  },
  seED1w6VEHyZYt3PYatR6: {
    id: 'seED1w6VEHyZYt3PYatR6',
    value: [
      {
        id: '51C_3iCoAZS_p82uIEW38',
        type: 'paragraph',
        children: [
          {
            text: 'sa dasdasdsadsadasdas',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 12,
      depth: 0,
    },
  },
  '01bb1-l1__SjLGHkyCFEu': {
    id: '01bb1-l1__SjLGHkyCFEu',
    value: [
      {
        id: 'vZ1fkciKTMVz6jl0YfGBc',
        type: 'paragraph',
        children: [
          {
            text: 'das as',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 13,
      depth: 0,
    },
  },
  'yGkXojWZCX-yO8gDTZ_-o': {
    id: 'yGkXojWZCX-yO8gDTZ_-o',
    value: [
      {
        id: '1dyj2k6kj4I3fyZr2VtLs',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 14,
      depth: 0,
    },
  },
};

const YooptaEditor = ({
  editor,
  value,
  marks: marksProps,
  plugins: pluginsProps,
  autoFocus,
  className,
  tools,
  selectionBoxRoot,
  children,
}: Props) => {
  const applyChanges = () => {
    setEditorState((prev) => ({ ...prev, version: prev.version + 1 }));
  };

  const marks = useMemo(() => {
    if (marksProps) return [FakeSelectionMark, ...marksProps];
    return [FakeSelectionMark];
  }, [marksProps]);

  const plugins = useMemo(() => {
    return pluginsProps.map((plugin) => plugin.getPlugin as PluginReturn<string, any, any>);
  }, [pluginsProps]);

  const [editorState, setEditorState] = useState<{ editor: YooEditor<any, 'hightlight'>; version: number }>(() => {
    editor.applyChanges = applyChanges;
    if (marks) editor.formats = buildMarks(editor, marks);
    editor.blocks = buildBlocks(editor, plugins);

    // editor.children = (isValidateInitialValue(value) ? value : DEFAULT_VALUE) as YooptaChildrenValue;
    editor.children = VALUES;
    editor.blockEditorsMap = buildBlockSlateEditors(editor);
    editor.shortcuts = buildBlockShortcuts(editor);
    editor.plugins = buildPlugins(plugins);

    editor.on = Events.on;
    editor.once = Events.once;
    editor.off = Events.off;
    editor.emit = Events.emit;

    return { editor, version: 0 };
  });

  return (
    <NoSSR>
      <UltraYooptaContextProvider editorState={editorState}>
        <ToolsProvider tools={tools}>
          <Editor marks={marks} autoFocus={autoFocus} className={className} selectionBoxRoot={selectionBoxRoot} />
          {children}
        </ToolsProvider>
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };
