import { Modify, YooptaBaseElement } from '@yoopta/editor';

type LinkOptions = { url: null | string | undefined; skipDrag: boolean };

export type LinkElement = Modify<YooptaBaseElement<'link'>, { data: LinkOptions }>;
