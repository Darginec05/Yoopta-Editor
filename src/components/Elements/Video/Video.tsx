import cx from 'classnames';
import { getElementClassname } from '../../Editor/utils';
import { VideoEditor } from '../../VideoEditor/VideoEditor';
import { VideoRender } from '../../VideoRender/VideoRender';
import s from './Video.module.scss';

const Video = ({ element, attributes, children, isEdit, dataNodeId }) => {
  if (isEdit) {
    return (
      <VideoEditor element={element} attributes={attributes} className={cx(s.video, getElementClassname(element))}>
        {children}
      </VideoEditor>
    );
  }

  return (
    <div className={cx(s.video, getElementClassname(element))} data-node-id={dataNodeId}>
      <VideoRender src={element.src} options={element.options} />
    </div>
  );
};

export { Video };
