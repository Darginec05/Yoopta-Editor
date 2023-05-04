import { createYoptaMark } from '@yoopta/editor';
import s from './Marks.module.scss';

export const Bold = createYoptaMark({ type: 'bold', hotkey: 'mod+b', className: s.bold });
export const Italic = createYoptaMark({ type: 'italic', hotkey: 'mod+i', className: s.italic });
export const Underline = createYoptaMark({ type: 'underline', hotkey: 'mod+u', className: s.underline });
export const Strike = createYoptaMark({ type: 'strike', hotkey: 'mod+shift+s', className: s.strike });
export const CodeMark = createYoptaMark({ type: 'code', hotkey: 'mod+e', className: s.code });
