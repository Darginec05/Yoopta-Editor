import { ToolbarProps } from './Toolbar';
import { cx, UI_HELPERS, useElements, useMarks, useTools } from '@yoopta/editor';
import s from './DefaultToolbar.module.scss';
import { useRef } from 'react';
import { useSlate } from 'slate-react';
import { useLinkTool } from '../hooks/useLinkTool';
import { useActionMenuTool } from '../hooks/useActionMenuTool';
import { useChatGPTTool } from '../hooks/useChatGPTTool';
import { Range } from 'slate';
import MagicIcon from '../icons/magic.svg';

const DefaultToolbar = ({ getRootProps }: ToolbarProps) => {
  const marks = useMarks();
  const elements = useElements();
  const tools = useTools();
  const editor = useSlate();
  const selectionRef = useRef<Range | null>(null);

  const { ActionMenu, LinkTool, ChatGPT } = tools || {};
  const hasActionMenuAsTool = !!ActionMenu;
  const hasLinkAsTool = !!LinkTool && !!elements.link;
  const hasChatGPTAsTool = !!ChatGPT;

  const toolbarRef = useRef<HTMLDivElement>(null);

  const { closeLinkTool, openLinkTool, linkToolProps, linkToolButtonRef, hasMatchedLink } = useLinkTool({
    editor,
    toolbarRef,
    selectionRef,
  });

  const { openActionMenuTool, closeActionMenuTool, turnIntoElementsProps, handleIntoButtonRef } = useActionMenuTool({
    editor,
    toolbarRef,
  });

  const { openChatGPTTool, closeChatGPTTool, chatGPTToolProps, ashGPTButtonRef, selectedNodeText } = useChatGPTTool({
    editor,
    toolbarRef,
    selectionRef,
  });

  // [TODO] - get only top level parent element
  const activeElementType = Object.keys(elements).find((key) => elements[key].isActive) || '';
  const activeElement = elements[activeElementType];

  return (
    <div {...getRootProps()} className={cx(getRootProps().className, 'yoopta-toolbar')}>
      <div className={s.toolbar} ref={toolbarRef}>
        {turnIntoElementsProps.open && hasActionMenuAsTool && (
          <UI_HELPERS.Overlay onClose={closeActionMenuTool}>
            <ActionMenu
              style={turnIntoElementsProps.style}
              options={{ shouldDeleteText: false }}
              on={{ toggle: closeActionMenuTool }}
            />
          </UI_HELPERS.Overlay>
        )}
        {linkToolProps.open && hasLinkAsTool && (
          <UI_HELPERS.Overlay onClose={closeLinkTool}>
            <LinkTool
              style={linkToolProps.style}
              selection={selectionRef.current}
              on={{ add: closeLinkTool, delete: closeLinkTool }}
            />
          </UI_HELPERS.Overlay>
        )}
        {chatGPTToolProps.open && hasLinkAsTool && (
          <UI_HELPERS.Overlay onClose={closeChatGPTTool}>
            <ChatGPT
              style={chatGPTToolProps.style}
              on={{ add: closeChatGPTTool, delete: closeChatGPTTool }}
              options={{ shouldDeleteText: false }}
              selection={selectionRef.current}
              placeholder="What I should make with text?"
              actions={[
                { name: 'Summarize' },
                { name: 'Fix spelling' },
                { name: 'Translate it to...' },
                { name: 'Continue writing' },
              ]}
              context={[
                {
                  content: selectedNodeText,
                  role: 'user',
                },
              ]}
            />
          </UI_HELPERS.Overlay>
        )}
        <div className={s.marks}>
          {hasChatGPTAsTool && (
            <>
              <button
                type="button"
                ref={ashGPTButtonRef}
                className={cx(s.elementButton, { [s.elementButtonActive]: chatGPTToolProps.open })}
                onMouseDown={openChatGPTTool}
              >
                <span>Ask GPT</span>
                {/* <MagicIcon width={16} height={16} className={s.icon} /> */}
              </button>
              <div className={s.separator} />
            </>
          )}
          {hasActionMenuAsTool && (
            <>
              <button
                type="button"
                ref={handleIntoButtonRef}
                className={cx(s.elementButton, { [s.elementButtonActive]: turnIntoElementsProps.open })}
                onMouseDown={openActionMenuTool}
              >
                <span>{activeElement?.options?.displayLabel || activeElementType}</span>
              </button>
              <div className={s.separator} />
            </>
          )}
          {hasLinkAsTool && (
            <>
              <button
                type="button"
                ref={linkToolButtonRef}
                className={cx(s.elementButton, { [s.elementButtonActive]: linkToolProps.open || hasMatchedLink })}
                onMouseDown={openLinkTool}
              >
                <span>Link</span>
              </button>
              <div className={s.separator} />
            </>
          )}
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.bold.isActive })}
            onClick={() => marks.bold.toggle()}
          >
            <span>
              <b>B</b>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.italic.isActive })}
            onClick={() => marks.italic.toggle()}
          >
            <span>
              <i>I</i>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.underline.isActive })}
            onClick={() => marks.underline.toggle()}
          >
            <span>
              <u>U</u>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.strike.isActive })}
            onClick={() => marks.strike.toggle()}
          >
            <span>
              <s>S</s>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.code.isActive })}
            onClick={() => marks.code.toggle()}
          >
            <span>
              <span>{'</>'}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { DefaultToolbar };
