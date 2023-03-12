import { useCallback, useEffect, useState, Key, useMemo } from 'react';
import { withHistory } from 'slate-history';
import { createEditor, Descendant } from 'slate';
import { Slate, withReact } from 'slate-react';
import { EditorYopta } from './components/Editor/Editor';
import { ScrollProvider } from './contexts/ScrollContext/ScrollContext';
// import { withVoidNodes, withFixDeleteFragment, withCopyPasting } from './components/Editor/plugins';
import { ActionMenuProvider } from './contexts/ActionMenuContext/ActionMenuContext';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';
import NoSSR from './components/NoSsr/NoSsr';
import type { LibOptions } from './contexts/SettingsContext/SettingsContext';
import { NodeSettingsProvider } from './contexts/NodeSettingsContext/NodeSettingsContext';
import { YoptaComponent, YoptaComponentType } from './utils/component';
import { getInitialState, getStorageName } from './utils/storage';
import { withShortcuts } from './components/Editor/plugins/shortcuts';
import { withVoidNodes } from './components/Editor/plugins/voids';
import uniqWith from 'lodash.uniqwith';

type Props = {
  onChange: (_value: Descendant[]) => void;
  value?: Descendant[];
  key?: Key;
  scrollElementSelector?: string;
  components: YoptaComponent[];
  readOnly?: boolean;
} & LibOptions;

const YoptaEditorLib = ({
  onChange,
  value,
  key,
  placeholder,
  scrollElementSelector,
  autoFocus = true,
  components,
  readOnly,
  ...options
}: Props) => {
  const storageName = getStorageName(options.shouldStoreInLocalStorage);
  const [val, setVal] = useState(() => getInitialState(options.shouldStoreInLocalStorage, storageName, value));

  // const [editor] = useState<CustomEditor>(() =>
  //   withHistory(
  //     withCopyPasting(
  //       withFixDeleteFragment(
  //         withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor()))))),
  //       ),
  //     ),
  //   ),
  // );

  // useEffect(() => {
  //   if (!autoFocus) return;

  // if (!editor.selection && editor.children.length > 0) {
  //   const focusTimeout = setTimeout(() => {
  //     const firstNode: any = editor.children[0];
  //     const isList = LIST_TYPES.includes(firstNode.type);

  //     Transforms.select(editor, { path: isList ? [0, 0, 0] : [0, 0], offset: 0 });
  //     ReactEditor.focus(editor);
  //   }, 0);

  //   return () => clearTimeout(focusTimeout);
  // }
  // }, [autoFocus]);

  const onChangeValue = useCallback(
    (data: Descendant[]) => {
      onChange(data);
      setVal(data);

      if (!options.shouldStoreInLocalStorage) return;

      const hasChanges = editor.operations.some((op) => op.type !== 'set_selection');

      if (hasChanges) {
        try {
          const content = JSON.stringify(data);
          localStorage.setItem(storageName, content);
          // eslint-disable-next-line no-empty
        } catch (error) {}
      }
    },
    [options.shouldStoreInLocalStorage],
  );

  const yoptaComponents = useMemo(() => {
    const yoptaComponents: Omit<YoptaComponentType, 'children'>[] = components
      .map((instance) => {
        const component = instance.getProps;
        const { children, ...restComponentProps } = component;
        return children ? [restComponentProps, children.getProps] : component;
      })
      .flat();

    const uniqueComponents = uniqWith(yoptaComponents, (a, b) => a.type === b.type);
    return uniqueComponents;
  }, [components]);

  const editor = useMemo(() => {
    let editor = withHistory(withShortcuts(withReact(createEditor())));
    // let editor = withHistory(withVoidNodes(withShortcuts(withReact(createEditor()))));

    const shortcutMap = {};

    yoptaComponents.forEach((component) => {
      if (component.shortcut) {
        shortcutMap[component.shortcut] = component.type;
      }

      editor = component.extendEditor?.(editor) || editor;
    });

    editor.shortcuts = shortcutMap;
    return editor;
  }, [components]);

  return (
    <Slate editor={editor} value={val} onChange={onChangeValue} key={key}>
      <SettingsProvider options={options}>
        <ScrollProvider scrollElementSelector={scrollElementSelector}>
          <ActionMenuProvider>
            <NodeSettingsProvider>
              <EditorYopta editor={editor} placeholder={placeholder} components={yoptaComponents} />
            </NodeSettingsProvider>
          </ActionMenuProvider>
        </ScrollProvider>
      </SettingsProvider>
    </Slate>
  );
};

const YoptaEditor = (props: Props) => {
  if (props.readOnly) {
    return <YoptaEditorLib {...props} />;
  }

  return (
    <NoSSR>
      <YoptaEditorLib {...props} />
    </NoSSR>
  );
};

export { YoptaEditor };
