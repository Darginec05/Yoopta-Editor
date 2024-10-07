import * as BlockOptionsUI from './BlockOptions/BlockOptions';
import { ExtendedBlockActions } from './ExtendedBlockActions/ExtendedBlockActions';
import { Portal } from './Portal/Portal';
import { Overlay } from './Overlay/Overlay';

export { type BlockOptionsProps } from './BlockOptions/BlockOptions';

export const UI = {
  ...BlockOptionsUI,
  ExtendedBlockActions,
  Portal,
  Overlay,
};
