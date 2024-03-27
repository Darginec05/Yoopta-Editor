import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { monokaiDimmed } from '@uiw/codemirror-theme-monokai-dimmed';
import { materialDark, materialLight } from '@uiw/codemirror-theme-material';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { copilot } from '@uiw/codemirror-theme-copilot';
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic';

export const THEMES_MAP = {
  BasicLight: basicLight,
  BasicDark: basicDark,
  VSCode: vscodeDark,
  Sublime: sublime,
  Okaidia: okaidia,
  Monokai: monokaiDimmed,
  MaterialDark: materialDark,
  MaterialLight: materialLight,
  GithubDark: githubDark,
  GithubLight: githubLight,
  Dracula: dracula,
  Copilot: copilot,
};
