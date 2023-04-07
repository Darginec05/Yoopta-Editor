import { Modify, YoptaBaseElement } from '@yopta/editor';

type LinkOptions = { url: null | string | undefined };

export type LinkElement = Modify<YoptaBaseElement<'link'>, { data: LinkOptions }>;
