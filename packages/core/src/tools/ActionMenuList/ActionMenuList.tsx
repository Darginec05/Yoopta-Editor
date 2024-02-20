import { createPortal } from 'react-dom';
import { TextIcon } from '@radix-ui/react-icons';
import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import { CSSProperties, useEffect, useState } from 'react';
import { YooEditor, YooptaBlock } from '../../editor/types';
import { Editor, Path } from 'slate';
import { HOTKEYS } from '../../utils/hotkeys';
import { useTools } from '../../contexts/UltraYooptaContext/ToolsContext';
import { ActionMenuComponent } from './component';
import { events } from './events';

const filterBy = (item: YooptaBlock | YooptaBlock['options'], text: string, field: string) => {
  if (!item || !item?.[field]) return false;
  return (item[field] as string).toLowerCase().indexOf(text) > -1;
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

type ActionMenuState = {
  open: boolean;
  style: CSSProperties;
};

const ActionMenuList = ({ trigger = '/', render }: Props) => {
  const editor = useYooptaEditor();
  const { registerTool, unregisterTool, tools } = useTools();

  const blockTypes = Object.keys(editor.blocks).sort((a, b) => {
    const aOrder = editor.blocks[a].order;
    const bOrder = editor.blocks[b].order;

    return aOrder - bOrder;
  });

  const [selectedAction, setSelectedAction] = useState(blockTypes[0]);
  const [actions, setActions] = useState(blockTypes);
  const [state, setState] = useState<ActionMenuState>({
    open: false,
    style: {},
  });

  const { open: isOpen, style } = state;

  const onOpen = ({ style }) => setState({ open: true, style });
  const onClose = () => setState({ open: false, style: {} });

  const onFilter = ({ text }) => {
    const string = text.trim().replace(trigger, '');

    if (string.length === 0 || string === trigger) return setActions(blockTypes);
    setActions(blockTypes.filter((type) => filterActionMenuItems(editor.blocks[type], string)));
  };

  // useEffect(() => {
  //   registerTool('actionMenu', {
  //     open: onOpen,
  //     close: onClose,
  //     change: onFilter,
  //     state,
  //     component: ActionMenuComponent,
  //     events,
  //   });
  //   return () => unregisterTool('actionMenu');
  // }, [state]);

  useEffect(() => {
    if (!isOpen || !tools.actionMenu) return;

    document.addEventListener('click', onClose);
    return () => document.removeEventListener('click', onClose);
  }, [isOpen, tools.actionMenu]);

  const onMouseEnter = (e: React.MouseEvent) => {
    const type = e.currentTarget.getAttribute('data-action-menu-item-type')!;
    setSelectedAction(type);
  };

  const isEmpty = actions.length === 0;
  const positions = { transform: `translate3d(${style?.left}, ${style?.top}, 0)` };

  if (!isOpen) return null;

  if (render) {
    const getItemProps = (props) => ({ onMouseEnter, selectedAction });
    return createPortal(render({ actions, isEmpty, positions, onClose, getItemProps }), document.body);
  }

  return createPortal(
    <ActionMenuComponent
      actions={actions}
      style={positions}
      editor={editor}
      onMouseEnter={onMouseEnter}
      selectedAction={selectedAction}
      onClose={onClose}
    />,
    document.body,
  );
};

export { ActionMenuList };
