import { useYooptaEditor } from '../../contexts/UltraYooptaContext/UltraYooptaContext';
import s from './UltraElementWrapper.module.scss';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import cx from 'classnames';
import { PLUGIN_INDEX } from '../Editor/utils';
import { getDefaultUltraBlock } from '../Editor/defaultValue';

const UltraElementWrapper = ({ children, plugin, pluginId }) => {
  const editor = useYooptaEditor();

  const onPlusClick = () => {
    const pluginIndex = PLUGIN_INDEX.get(plugin);
    const defaultBlock = getDefaultUltraBlock();

    const nextPath = [pluginIndex + 1];
    editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
  };

  const onMoveBlock = () => {
    const pluginIndex = PLUGIN_INDEX.get(plugin);
    editor.moveBlock([pluginIndex], [pluginIndex + 1]);
  };

  return (
    <div className={s.root} data-yoopta-plugin-id={pluginId} data-yoopta-plugin>
      <div contentEditable={false} className={cx(s.actions, { [s.hovered]: false }, 'yoopta-element-actions')}>
        <button
          type="button"
          onClick={onPlusClick}
          className={cx(s.actionButton, s.plusButton, 'yoopta-element-actions-plus')}
        >
          <PlusIcon />
        </button>
        <button type="button" onMouseDown={onMoveBlock} className={cx(s.actionButton, 'yoopta-element-actions-drag')}>
          <DragIcon />
        </button>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export { UltraElementWrapper };
