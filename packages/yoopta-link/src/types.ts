import { Modify, YoptaBaseElement } from '@yoopta/editor';

type LinkOptions = { url: null | string | undefined; skipDrag: boolean };

export type LinkElement = Modify<YoptaBaseElement<'link'>, { data: LinkOptions }>;
