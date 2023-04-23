import { Modify, YoptaBaseElement } from '@yopta/editor';

type LinkOptions = { url: null | string | undefined; skipDrag: boolean };

export type LinkElement = Modify<YoptaBaseElement<'link'>, { data: LinkOptions }>;
