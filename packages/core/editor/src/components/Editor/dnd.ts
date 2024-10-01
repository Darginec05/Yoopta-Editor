import { YooEditor } from '../../editor/types';
import { KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useCallback } from 'react';

export const useYooptaDragDrop = ({ editor }: { editor: YooEditor }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 20,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const newPluginPosition = editor.children[over.id].meta.order;
      // [TEST]
      editor.moveBlock(active.id as string, [newPluginPosition]);
    }
  }, []);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    editor.setSelection([null]);
  }, []);

  return { sensors, handleDragEnd, handleDragStart };
};
