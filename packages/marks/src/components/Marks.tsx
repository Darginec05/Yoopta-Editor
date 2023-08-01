import { createYooptaMark } from '@yoopta/editor';
import s from './Marks.module.scss';

export const Bold = createYooptaMark({ type: 'bold', hotkey: 'mod+b', className: s.bold, as: 'strong' });
export const Italic = createYooptaMark({ type: 'italic', hotkey: 'mod+i', className: s.italic, as: 'em' });
export const Underline = createYooptaMark({ type: 'underline', hotkey: 'mod+u', className: s.underline });
export const Strike = createYooptaMark({ type: 'strike', hotkey: 'mod+shift+s', className: s.strike });
export const CodeMark = createYooptaMark({ type: 'code', hotkey: 'mod+e', className: s.code });
