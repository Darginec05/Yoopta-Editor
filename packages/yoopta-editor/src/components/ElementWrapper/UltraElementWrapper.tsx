import { useYooptaEditor } from '../YooptaEditor/contexts/UltraYooptaContext/UltraYooptaContext';
import s from './UltraElementWrapper.module.scss';
import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import cx from 'classnames';
import { PLUGIN_INDEX } from '../YooptaEditor/utils';
import { DEFAULT_ULTRA_PLUGIN } from '../YooptaEditor/defaultValue';
import { generateId } from '../../utils/generateId';

const DEFAULT_BLOCK = {
  value: [DEFAULT_ULTRA_PLUGIN],
  type: 'paragraph',
  meta: {},
};

const UltraElementWrapper = ({ children, element }) => {
  const editor = useYooptaEditor();

  const onPlusClick = () => {
    const pluginIndex = PLUGIN_INDEX.get(element);
    // editor.insertBlock(DEFAULT_BLOCK, [pluginIndex + 1]);
    editor.insertBlock(DEFAULT_BLOCK);
  };

  const onMoveBlock = () => {
    const pluginIndex = PLUGIN_INDEX.get(element);
    editor.moveBlock([pluginIndex], [pluginIndex + 1]);
  };

  return (
    <div className={s.root}>
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
