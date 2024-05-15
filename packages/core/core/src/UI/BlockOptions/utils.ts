import { YooEditor } from '../../editor/types';
import { getRootBlockElement } from '../../utils/blockElements';

type Params = {
  editor: YooEditor;
  onClose: () => void;
  empty?: boolean;
  withVoids?: boolean;
  view?: 'small' | 'default';
  mode?: 'toggle' | 'create';
};

export function buildActionMenuRenderProps({ editor, view, onClose, mode = 'toggle' }: Params) {
  function filterToggleActions(editor: YooEditor, type: string) {
    const block = editor.blocks[type];
    if (!block) return false;

    const rootBlock = getRootBlockElement(block.elements);
    if (rootBlock?.props?.nodeType === 'void') return false;
    return true;
  }

  const getActions = () => {
    let items = Object.keys(editor.blocks);

    if (mode === 'toggle') {
      items = items.filter((type) => filterToggleActions(editor, type));
    }

    return items.map((action) => {
      const title = editor.blocks[action].options?.display?.title || action;
      const description = editor.blocks[action].options?.display?.description;
      return { type: action, title, description };
    });
  };

  const getRootProps = () => ({
    'data-action-menu-list': true,
  });

  const getItemProps = (type) => ({
    onMouseEnter: () => undefined,
    'data-action-menu-item': true,
    'data-action-menu-item-type': type,
    'aria-selected': false,
    onClick: () => {
      if (mode === 'toggle') editor.blocks[type].toggle({ focus: true });
      if (mode === 'create') editor.blocks[type].create({ deleteText: true, focus: true });

      onClose();
    },
  });

  return {
    actions: getActions(),
    onClose,
    empty: false,
    getItemProps,
    getRootProps,
    editor,
    view,
  };
}
