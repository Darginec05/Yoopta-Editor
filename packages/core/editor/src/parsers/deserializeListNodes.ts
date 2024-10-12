import {Descendant} from 'slate';
import {SlateElement, YooEditor} from '../editor/types';
import {generateId} from '../utils/generateId';

type ListElement = HTMLUListElement | HTMLOListElement | Element

export function deserializeListNodes(editor: YooEditor, listElement: ListElement): Descendant[] {
    const deserializedNodes: Descendant[] = [];

    if (listElement.nodeName === 'UL' || listElement.nodeName === 'OL') {
        const listItems = Array.from(listElement.children).filter(el => el.nodeName === 'LI');

        listItems.forEach((item) => {
            const listItemChildren: Descendant[] = [];
            const itemText = item.childNodes[0]?.textContent?.trim() ?? '';

            const isTodoListItem = /\[\s*\S?\s*\]/.test(itemText);

            if (isTodoListItem) {
                return;
            }

            if (itemText.length > 0) {
                listItemChildren.push({ text: itemText, });
            } else {
                // Don't like this, but I was getting an error when it was empty
                listItemChildren.push({ text: '' });
            }

            const nestedList = item.querySelector('ul, ol');
            if (nestedList) {
                const nestedListNodes = deserializeListNodes(editor, nestedList);
                listItemChildren.push({
                    id: generateId(),
                    type: 'list-item',
                    children: nestedListNodes,
                });
            }

            deserializedNodes.push({
                id: generateId(),
                type: listElement.nodeName === 'UL' ? 'bulleted-list' : 'ordered-list',
                children: listItemChildren,
                props: { nodeType: 'block' }
            });
        });
    }

    return deserializedNodes;
}
