import { useMemo } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Block } from '../Block/Block';
import { PluginReturn } from '../../plugins/types';
import { YooEditor } from '../../editor/types';
import { YooptaMark } from '../../marks';
import { SlateEditorComponent } from '../../plugins/SlateEditorComponent';
import { useYooptaDragDrop } from './dnd';

const DEFAULT_EDITOR_KEYS = [];

type Props = {
  editor: YooEditor;
  marks?: YooptaMark<any>[];
};

const RenderBlocks = ({ editor, marks }: Props) => {
  const { sensors, handleDragEnd, handleDragStart } = useYooptaDragDrop({ editor });
  const childrenUnorderedKeys = Object.keys(editor.children);
  const childrenKeys = useMemo(() => {
    if (childrenUnorderedKeys.length === 0) return DEFAULT_EDITOR_KEYS;

    return childrenUnorderedKeys.sort((a, b) => {
      const aOrder = editor.children[a].meta.order;
      const bOrder = editor.children[b].meta.order;

      return aOrder - bOrder;
    });

    //[TODO] - unnecesary
  }, [childrenUnorderedKeys]);

  const blocks: JSX.Element[] = [];

  for (let i = 0; i < childrenKeys.length; i++) {
    const childrenId = childrenKeys[i];
    const block = editor.children[childrenId];
    const plugin = editor.plugins[block.type];

    if (!block || !plugin) {
      console.error(`Plugin ${block.type} not found`);
      continue;
    }

    blocks.push(
      <Block key={childrenId} block={block} blockId={childrenId}>
        <SlateEditorComponent
          key={childrenId}
          type={block.type}
          id={childrenId}
          marks={marks}
          // customEditor={plugin.customEditor}
          events={plugin.events}
          elements={plugin.elements}
          options={plugin.options}
        />
      </Block>,
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={childrenKeys} strategy={verticalListSortingStrategy}>
        {blocks}
      </SortableContext>
    </DndContext>
  );
};

export { RenderBlocks };
