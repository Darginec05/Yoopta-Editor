import { createYoptaMark } from '@yopta/editor';
import s from './Marks.module.scss';

export const Bold = createYoptaMark({ type: 'bold', className: s.bold });
export const Italic = createYoptaMark({ type: 'italic', className: s.italic });
export const Underline = createYoptaMark({ type: 'underline', className: s.underline });
export const Strike = createYoptaMark({ type: 'strike', className: s.strike });
export const CodeMark = createYoptaMark({ type: 'code', className: s.code });
