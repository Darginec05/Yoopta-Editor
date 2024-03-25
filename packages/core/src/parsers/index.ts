import { deserializeHTML } from './deserializeHTML';
import { serializeHTML } from './serializeHTML';

export const parsers = {
  html: {
    deserialize: deserializeHTML,
    serialize: serializeHTML,
  },
  markdown: {},
};
