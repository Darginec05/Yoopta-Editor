import { TextIcon } from '@radix-ui/react-icons';

const ActionMenuComponent = ({ actions, editor, onMouseEnter, selectedAction, onClose, empty }) => {
  return (
    <div className="bg-white z-50 h-auto max-h-[330px] max-w-[250px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 transition-all shadow-md">
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
        <div data-action-menu-list className="overflow-hidden p-0 text-foreground">
          {empty && <div className="text-left text-muted-foreground text-xs px-1 py-1">No actions available</div>}
          {actions.map((type, i) => {
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
