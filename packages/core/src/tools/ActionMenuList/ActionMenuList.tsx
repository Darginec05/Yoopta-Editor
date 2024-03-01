import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { useEffect, useState } from 'react';
import { YooptaBlock } from '../../editor/types';
import { useTools } from '../../contexts/UltraYooptaContext/ToolsContext';
import { ActionMenuComponent } from './component';
import { events } from './events';
import { useFloating, offset, flip, shift, inline, autoUpdate, FloatingPortal } from '@floating-ui/react';

const filterBy = (item: YooptaBlock | YooptaBlock['options'], text: string, field: string) => {
  if (!item || !item?.[field]) return false;
  return (item[field] as string).toLowerCase().indexOf(text.toLowerCase()) > -1;
};

const filterActionMenuItems = (block: YooptaBlock, text: string) => {
  if (!text) return true;

  return filterBy(block, text, 'type') || filterBy(block.options, text, 'displayLabel');
};

type Props = {
  trigger?: string;
  // {
  //   id: 'insertImage',
  //   title: 'Insert Image',
  //   description: 'Insert an image into the text',
  //   icon: ImageIcon,
  //   handler: () => { /* Функция для вставки изображения */ },
  // }
  actions?: YooptaBlock[];
  render?: (props: any) => JSX.Element;
};

const ActionMenuList = ({ trigger = '/', render }: Props) => {
  const editor = useYooptaEditor();
  const { registerTool, unregisterTool, tools } = useTools();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'top-start',
    open: isMenuOpen,
    onOpenChange: setIsMenuOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  // [TODO] - !!!
  const blockTypes = Object.keys(editor.blocks).sort((a, b) => {
    const aOrder = editor.blocks[a].order;
    const bOrder = editor.blocks[b].order;

    return aOrder - bOrder;
  });

  const [selectedAction, setSelectedAction] = useState(blockTypes[0]);
  const [actions, setActions] = useState(blockTypes);

  const onOpen = () => setIsMenuOpen(true);
  const onClose = () => setIsMenuOpen(false);

  const onFilter = ({ text }) => {
    const string = text.trim().replace(trigger, '');

    if (string.length === 0 || string === trigger) return setActions(blockTypes);
    setActions(blockTypes.filter((type) => filterActionMenuItems(editor.blocks[type], string)));
  };

  useEffect(() => {
    registerTool('actionMenu', {
      open: onOpen,
      close: onClose,
      change: onFilter,
      state: { isMenuOpen, refs },
      component: ActionMenuComponent,
      events,
    });
    return () => unregisterTool('actionMenu');
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !tools.actionMenu) return;

    document.addEventListener('click', onClose);
    return () => document.removeEventListener('click', onClose);
  }, [isMenuOpen, tools.actionMenu]);

  const onMouseEnter = (e: React.MouseEvent) => {
    const type = e.currentTarget.getAttribute('data-action-menu-item-type')!;
    setSelectedAction(type);
  };

  const empty = actions.length === 0;

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (empty) onClose();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [actions.length]);

  if (!isMenuOpen) return null;

  if (render) {
    const getItemProps = (props) => ({ onMouseEnter, selectedAction });

    return (
      <FloatingPortal>
        <div
          className="absolute z-[9999] m-0 left-0 top-0 right-auto bottom-auto"
          style={floatingStyles}
          ref={refs.setFloating}
        >
          {render({ getItemProps, actions, editor, onMouseEnter, selectedAction, onClose, empty })}
        </div>
      </FloatingPortal>
    );
  }

  return (
    // [TODO] - take care about SSR
    <FloatingPortal root={document.getElementById('yoopta-editor')}>
      <div
        className="absolute z-[9999] m-0 left-0 top-0 right-auto bottom-auto"
        style={floatingStyles}
        ref={refs.setFloating}
      >
        <ActionMenuComponent
          actions={actions}
          editor={editor}
          onMouseEnter={onMouseEnter}
          selectedAction={selectedAction}
          onClose={onClose}
          empty={empty}
        />
      </div>
    </FloatingPortal>
  );
};

export { ActionMenuList };
