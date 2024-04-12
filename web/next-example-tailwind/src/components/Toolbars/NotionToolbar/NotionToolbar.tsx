import { ToolbarRenderProps } from '@yoopta/toolbar';
import { getRootBlockElement, useYooptaEditor, useYooptaTools, YooEditor } from '@yoopta/editor';
import cx from 'classnames';
import s from './NotionToolbar.module.scss';
import { CodeIcon, ChevronDownIcon, RadicalIcon } from 'lucide-react';
import { useState } from 'react';
import { useFloating, offset, flip, shift, inline, autoUpdate, FloatingPortal } from '@floating-ui/react';

const DEFAULT_MODALS = { link: false, highlight: false, actionMenu: false };
type ModalsState = typeof DEFAULT_MODALS;

function filterToggleActions(editor: YooEditor, type: string) {
  const block = editor.blocks[type];
  if (!block) return false;

  const rootBlock = getRootBlockElement(block.elements);
  if (rootBlock?.props?.nodeType === 'void') return false;
  return true;
}

const NotionToolbar = (props: ToolbarRenderProps) => {
  const [modals, setModals] = useState<ModalsState>({ link: false, highlight: false, actionMenu: false });

  const { refs: actionMenuRefs, floatingStyles: actionMenuStyles } = useFloating({
    placement: 'bottom-start',
    open: modals.actionMenu,
    onOpenChange: (open) => onChangeModal('actionMenu', open),
    middleware: [inline(), flip(), shift(), offset(10)],
    whileElementsMounted: autoUpdate,
  });

  const onChangeModal = (modal: keyof ModalsState, value: boolean) => {
    setModals(() => ({ ...DEFAULT_MODALS, [modal]: value }));
  };

  const { activeBlock } = props;
  const editor = useYooptaEditor();
  const tools = useYooptaTools();

  const blockLabel = activeBlock?.options?.display?.title || activeBlock?.type || '';
  const ActionMenu = tools.ActionMenu;

  const onCloseActionMenu = () => onChangeModal('actionMenu', false);

  const getRootProps = () => ({
    'data-action-menu-list': true,
  });

  const getItemProps = (type: string) => ({
    onMouseEnter: () => undefined,
    'data-action-menu-item': true,
    'data-action-menu-item-type': type,
    'aria-selected': blockLabel?.type === type,
    onClick: () => {
      editor.blocks[type].toggle(type, { focus: true });
      onCloseActionMenu();
    },
  });

  const getActions = () => {
    const items = Object.keys(editor.blocks)
      .filter((type) => filterToggleActions(editor, type))
      .map((action) => {
        const title = editor.blocks[action].options?.display?.title || action;
        const description = editor.blocks[action].options?.display?.description;
        return { type: action, title, description };
      });

    return items;
  };

  const actionMenuRenderProps = {
    actions: getActions(),
    onClose: onCloseActionMenu,
    empty: false,
    getItemProps,
    getRootProps,
    editor,
    blockLabel,
    view: 'small',
  };

  return (
    <div>
      <div className={s.toolbar}>
        <div className={s.group}>
          <button type="button" className={s.item} onClick={() => alert('Soon... 😍 \nIn development')}>
            <span className={s.askGPT}>Ask AI</span>
          </button>
        </div>
        <div className={s.group}>
          <button type="button" className={s.item} onClick={() => onChangeModal('actionMenu', !modals.actionMenu)}>
            <span className={s.block}>
              {blockLabel} <ChevronDownIcon size={12} strokeWidth={2} color="rgba(55, 53, 47, 0.35)" />
            </span>
            {modals.actionMenu && !!ActionMenu && (
              <FloatingPortal
                id="yoo-custom-toolbar-action-menu-list-portal"
                root={document.getElementById('yoopta-editor')}
              >
                <div style={actionMenuStyles} ref={actionMenuRefs.setFloating} onClick={(e) => e.stopPropagation()}>
                  <ActionMenu {...actionMenuRenderProps} />
                </div>
              </FloatingPortal>
            )}
          </button>
        </div>
        <div className={s.group}>
          <button
            type="button"
            onClick={() => editor.formats.bold.toggle()}
            className={cx(s.item, { [s.active]: editor.formats.bold.isActive() })}
          >
            <span className={s.bold}>B</span>
          </button>
          <button
            type="button"
            onClick={() => editor.formats.italic.toggle()}
            className={cx(s.item, { [s.active]: editor.formats.italic.isActive() })}
          >
            <span className={s.italic}>i</span>
          </button>
          <button
            type="button"
            onClick={() => editor.formats.underline.toggle()}
            className={cx(s.item, { [s.active]: editor.formats.underline.isActive() })}
          >
            <span className={s.underline}>U</span>
          </button>
          <button
            type="button"
            onClick={() => editor.formats.strike.toggle()}
            className={cx(s.item, { [s.active]: editor.formats.strike.isActive() })}
          >
            <span className={s.strikethrough}>S</span>
          </button>
          <button
            type="button"
            onClick={() => editor.formats.code.toggle()}
            className={cx(s.item, { [s.active]: editor.formats.code.isActive() })}
          >
            <span className={s.code}>
              <CodeIcon size={15} strokeWidth={1.5} />
            </span>
          </button>
          <button
            type="button"
            // onClick={() => editor.formats.code.toggle()}
            className={cx(s.item, { [s.active]: editor.formats.code.isActive() })}
          >
            <span className={s.code}>
              <RadicalIcon size={15} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { NotionToolbar };
