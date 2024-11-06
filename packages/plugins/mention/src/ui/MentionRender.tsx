import React, { useState, useCallback, useEffect } from 'react';
import { PluginElementRenderProps, generateId } from '@yoopta/editor';
import { useSlate, useSelected } from 'slate-react';
import { Transforms, Editor } from 'slate';

const MENTION_TRIGGER = '@';

interface MentionRenderProps extends PluginElementRenderProps {
  initialMentions: string[];
  fetchMentions: (query: string) => Promise<string[]>;
}

const MentionRender = (props: MentionRenderProps) => {
  const { character } = props.element.props || {};
  const { initialMentions = [], fetchMentions } = props;
  const selected = useSelected();
  const editor = useSlate();

  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [mentionList, setMentionList] = useState<string[]>(initialMentions);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const bgColor = selected ? 'yoo-m-bg-[#e2e2e2]' : 'yoo-m-bg-[#f4f4f5]';

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === MENTION_TRIGGER) {
        setShowMenu(true);
        setSearch('');
        setMentionList(initialMentions); // Populate list with initial mentions on open
      } else if (showMenu) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % mentionList.length);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setHighlightedIndex((prev) => (prev - 1 + mentionList.length) % mentionList.length);
        } else if (event.key === 'Enter') {
          event.preventDefault();
          insertMention(editor, mentionList[highlightedIndex]);
          setShowMenu(false);
        } else if (event.key === 'Escape') {
          setShowMenu(false);
        }
      }
    },
    [showMenu, mentionList, highlightedIndex, editor, initialMentions],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (showMenu) {
      fetchMentions(search).then(setMentionList); // should we offer fuzzy search here?
    }
  }, [search, showMenu, fetchMentions]);

  const insertMention = (editor: Editor, character: string) => {
    const mention = { id: generateId(), type: 'mention', character, children: [{ text: '' }] };
    Transforms.insertNodes(editor, mention); // @todo fix type: 'mention' types
    Transforms.move(editor); // move cursor after
  };

  return (
    <>
      <span
        className={`yoo-m-relative yoo-m-rounded yoo-m-cursor-pointer yoo-m-px-[0.3rem] yoo-m-py-[0.2rem] yoo-m-font-mono yoo-m-color-[#fff] yoo-m-text-sm yoo-m-font-semibold ${bgColor}`}
        {...props.attributes}
      >
        {character ? `@${character}` : null}
        {props.children}
      </span>

      {showMenu && (
        <div role="listbox" aria-activedescendant={`mention-item-${highlightedIndex}`} className="mention-menu">
          {mentionList.map((mention, index) => (
            <div
              id={`mention-item-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              key={index}
              className={`mention-item ${highlightedIndex === index ? 'highlighted' : ''}`}
              onClick={() => {
                insertMention(editor, mention);
                setShowMenu(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              @{mention}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { MentionRender };
