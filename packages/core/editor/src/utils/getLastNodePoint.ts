import { Editor, Element, Node, Text } from 'slate';
import { Point } from 'slate';
import { SlateEditor } from '../editor/types';

export function getLastNodePoint(slate: SlateEditor): Point {
  try {
    const [, lastPath] = Editor.last(slate, []);
    console.log('getLastNodePoint lastPath', lastPath);
    console.log('getLastNodePoint Node.get(slate, lastPath)', Node.get(slate, lastPath));

    return { path: lastPath, offset: Node.string(Node.get(slate, lastPath)).length };
  } catch (error) {
    console.log('getLastNodePoint error', error);
    return {
      path: [0, 0],
      offset: 0,
    };
  }
}
