import { TextIcon } from '@radix-ui/react-icons';
import { getRootBlockElement, YooEditor, YooptaBlock } from '@yoopta/editor';

type Props = {
  actions: string[];
  editor: YooEditor;
  onMouseEnter?: (e: React.MouseEvent) => void;
  selectedAction: string;
  onClose: () => void;
  empty: boolean;
  mode?: 'toggle' | 'create';
};

function filterToggleActions(block: YooptaBlock) {
  if (!block) return false;

  const rootBlock = getRootBlockElement(block.elements);
  if (rootBlock?.props?.nodeType === 'void') return false;
  return true;
}

const ActionMenuComponent = ({
  actions: actionsProps,
  editor,
  onMouseEnter,
  selectedAction,
  onClose,
  empty,
  mode = 'create',
}: Props) => {
  const isModeToggle = mode === 'toggle';

  const getActions = () => {
    if (isModeToggle) return actionsProps.filter((type) => filterToggleActions(editor.blocks[type]));

    return actionsProps;
  };

  const actions = getActions();

  return (
    <div className="yoo-action-menu-bg-white yoo-action-menu-z-50 yoo-action-menu-h-auto yoo-action-menu-max-h-[330px] yoo-action-menu-max-w-[250px] yoo-action-menu-w-72 yoo-action-menu-overflow-y-auto yoo-action-menu-rounded-md yoo-action-menu-border yoo-action-menu-border-muted yoo-action-menu-bg-background yoo-action-menu-px-1 yoo-action-menu-py-2 yoo-action-menu-transition-all yoo-action-menu-shadow-md">
      <div className="yoo-action-menu-max-h-[300px] yoo-action-menu-overflow-y-auto yoo-action-menu-overflow-x-hidden">
        <div
          data-action-menu-list
          className="yoo-action-menu-overflow-hidden yoo-action-menu-p-0 yoo-action-menu-text-foreground"
        >
          {empty && (
            <div className="yoo-action-menu-text-left yoo-action-menu-text-muted-foreground yoo-action-menu-text-xs yoo-action-menu-px-1 yoo-action-menu-py-1">
              No actions available
            </div>
          )}
          {actions.map((type, i) => {
            // [TODO] - transform string actions to array of objects
            const block = editor.blocks[type];

            if (!block) return null;

            return (
              <button
                key={type}
                onMouseEnter={onMouseEnter}
                aria-selected={type === selectedAction}
                data-action-menu-item
                data-action-menu-item-type={type}
                onClick={() => {
                  if (isModeToggle) {
                    editor.blocks[type].toggle(type, { focus: true });
                  } else {
                    editor.blocks[type].create({ deleteText: true, focus: true });
                  }

                  onClose();
                }}
                className="yoo-action-menu-flex yoo-action-menu-w-full yoo-action-menu-cursor-pointer yoo-action-menu-items-center yoo-action-menu-space-x-2 yoo-action-menu-rounded-md yoo-action-menu-px-1 yoo-action-menu-py-1 yoo-action-menu-mb-0.5 last:yoo-action-menu-mb-0 yoo-action-menu-text-left yoo-action-menu-text-sm hover:yoo-action-menu-bg-[#f4f4f5] aria-selected:yoo-action-menu-bg-[#f0f0f0]"
              >
                <div className="yoo-action-menu-flex yoo-action-menu-h-10 yoo-action-menu-w-10 yoo-action-menu-items-center yoo-action-menu-justify-center yoo-action-menu-rounded-md yoo-action-menu-border yoo-action-menu-border-muted yoo-action-menu-bg-white">
                  <TextIcon />
                </div>
                <div>
                  <div className="yoo-action-menu-font-medium">{block.options?.displayLabel || block.type}</div>
                  <div className="yoo-action-menu-text-xs yoo-action-menu-text-muted-foreground">Description</div>
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
