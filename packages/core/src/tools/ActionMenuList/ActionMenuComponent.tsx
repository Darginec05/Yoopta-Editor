import { TextIcon } from '@radix-ui/react-icons';
import { YooEditor } from '../../editor/types';
import { getRootBlockElement } from '../../utils/blockElements';

type Props = {
  actions: string[];
  editor: YooEditor;
  onMouseEnter?: (e: React.MouseEvent) => void;
  selectedAction: string;
  onClose: () => void;
  empty: boolean;
  mode?: 'toggle' | 'create';
};

const ActionMenuComponent = ({
  actions: actionsProps,
  editor,
  onMouseEnter,
  selectedAction,
  onClose,
  empty,
  mode = 'create',
}: Props) => {
  const getActions = () => {
    if (mode === 'toggle') {
      return actionsProps.filter((type) => {
        const block = editor.blocks[type];
        if (!block) return false;

        const rootBlock = getRootBlockElement(block.elements);
        if (rootBlock?.props?.nodeType === 'void') return false;
        return true;
      });
    }

    return actionsProps;
  };

  const actions = getActions();

  return (
    <div className="bg-white z-50 h-auto max-h-[330px] max-w-[250px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 transition-all shadow-md">
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
        <div data-action-menu-list className="overflow-hidden p-0 text-foreground">
          {empty && <div className="text-left text-muted-foreground text-xs px-1 py-1">No actions available</div>}
          {actions.map((type, i) => {
            // [TODO] - make action to array of objects
            const block = editor.plugins[type];

            if (!block) return null;

            return (
              <button
                key={type}
                onMouseEnter={onMouseEnter}
                aria-selected={type === selectedAction}
                data-action-menu-item
                data-action-menu-item-type={type}
                onClick={() => {
                  editor.blocks[type].create({ deleteText: true, focus: true });
                  onClose();
                }}
                className="flex w-full cursor-pointer items-center space-x-2 rounded-md px-1 py-1 mb-0.5 last:mb-0 text-left text-sm hover:bg-[#f4f4f5] aria-selected:bg-[#f0f0f0]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-white">
                  <TextIcon />
                </div>
                <div>
                  <div className="font-medium">{block.options?.displayLabel || block.type}</div>
                  <div className="text-xs text-muted-foreground">Description</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ActionMenuComponent };
