import { UI } from '@yoopta/editor';

const { Overlay, Portal } = UI;

const InputThumbnailUrl = ({ floatingStyles, onClose, refs, value, onChange, onSave, onDelete }) => {
  return (
    <Portal id="yoo-image-uploader-portal">
      <Overlay lockScroll className="yoo-image-z-[100]" onClick={onClose}>
        <div ref={refs.setFloating} style={floatingStyles} onClick={(e) => e.stopPropagation()}>
          <div className="yoopta-image-input-root yoo-image-shadow-y-[4px]">
            <div>
              <label htmlFor="thumbnail" className="yoopta-image-input-label">
                Thumbnail URL
              </label>
              <input
                id="thumbnail"
                type="text"
                className="yoopta-image-input-ui"
                name="thumbnail"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Edit thumbnail URL"
                autoComplete="off"
              />
            </div>

            <div className="yoo-image-mt-2 yoo-image-flex yoo-image-justify-between">
              <button
                type="button"
                className="yoopta-button yoo-image-bg-[#1183ff] yoo-image-text-[#fff] yoo-image-text-sm yoo-image-font-medium yoo-image-py-[5px] yoo-image-px-[10px] yoo-image-rounded-md yoo-image-shadow-sm disabled:yoo-image-opacity-50"
                disabled={!value}
                onClick={onSave}
              >
                Update
              </button>
              <button
                type="button"
                className="yoopta-button yoo-image-ml-2 yoo-image-bg-[#f4f4f5] yoo-image-text-[#000] yoo-image-text-sm yoo-image-font-medium yoo-image-py-[5px] yoo-image-px-[10px] yoo-image-rounded-md yoo-image-shadow-sm disabled:yoo-image-opacity-50"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Overlay>
    </Portal>
  );
};

export { InputThumbnailUrl };
