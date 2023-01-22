import { YoptaRenderer } from 'yopta-editor';
import s from '../../styles/Home.module.scss';

const exampleData = [
  {
    type: 'heading-one',
    id: '2bd45b27-e7db-460d-8ae0-96c9f4824f8b',
    children: [
      {
        text: 'Introduction',
      },
    ],
  },
  {
    type: 'heading-two',
    id: 'c74c5644-8383-4434-8291-80082b0a2ea9',
    children: [
      {
        text: 'Why?',
      },
      {
        type: 'link',
        url: 'https://docs.slatejs.org/#why',
        id: '71e00320-18b5-411e-9ac8-c4f37c2ea75e',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        text: '',
      },
    ],
  },
  {
    id: '1a66b323-4656-4d4c-9b4a-6ff723a52585',
    type: 'paragraph',
    children: [
      {
        text: '​',
      },
      {
        type: 'link',
        url: 'http://slatejs.org/',
        id: '85c4d3fc-c734-4f3a-b859-0f27efba5c2f',
        children: [
          {
            text: 'Slate',
          },
        ],
      },
      {
        text: ' is a ',
      },
      {
        text: 'completely',
        italic: true,
      },
      {
        text: ' customizable framework for building rich text editors.Slate lets you build rich, intuitive editors like those in ',
      },
      {
        type: 'link',
        url: 'https://medium.com/',
        id: '8d28b262-e77a-439e-979f-58080676245d',
        children: [
          {
            text: 'Medium',
          },
        ],
      },
      {
        text: ', ',
      },
      {
        type: 'link',
        url: 'http://localhost:3000/',
        id: 'fa60b1e7-3872-4259-9f2a-e6b6e7271c7c',
        children: [
          {
            text: 'Dropbox Paper',
          },
        ],
      },
      {
        text: ' or ',
      },
      {
        type: 'link',
        url: 'https://www.google.com/docs/about/',
        id: '88493909-5f13-4f72-9fba-10f8b327cbb4',
        children: [
          {
            text: 'Google Docs',
          },
        ],
      },
      {
        text: "—which are becoming table stakes for applications on the web—without your codebase getting mired in complexity.It can do this because all of its logic is implemented with a series of plugins, so you aren't ever constrained by what ",
      },
      {
        text: 'is',
        italic: true,
      },
      {
        text: ' or ',
      },
      {
        text: "isn't",
        italic: true,
      },
      {
        text: ' in "core". You can think of it like a pluggable implementation of ',
      },
      {
        text: 'contenteditable',
        code: true,
      },
      {
        text: ' built on top of ',
      },
      {
        type: 'link',
        url: 'https://facebook.github.io/react/',
        id: 'c2e02543-6ac4-49b1-aabe-3321d24f7f5f',
        children: [
          {
            text: 'React',
          },
        ],
      },
      {
        text: '. It was inspired by libraries like ',
      },
      {
        type: 'link',
        url: 'https://facebook.github.io/draft-js/',
        id: '9f7d65ce-588a-427e-a3f0-14cc964ecefe',
        children: [
          {
            text: 'Draft.js',
          },
        ],
      },
      {
        text: ', ',
      },
      {
        type: 'link',
        url: 'http://prosemirror.net/',
        id: '82fac3a5-4982-465b-98eb-3034a4189afa',
        children: [
          {
            text: 'Prosemirror',
          },
        ],
      },
      {
        text: ' and ',
      },
      {
        type: 'link',
        url: 'http://quilljs.com/',
        id: '2ab04cc6-2984-46f1-a34f-02af7b59fe79',
        children: [
          {
            text: 'Quill',
          },
        ],
      },
      {
        text: '.Why create Slate? Well... ',
      },
      {
        text: '(Beware: this section has a few of',
        italic: true,
      },
      {
        text: ' ',
      },
      {
        type: 'link',
        url: 'https://github.com/ianstormtaylor',
        id: 'c89ef14a-863c-42b0-9391-930a32f158d6',
        children: [
          {
            text: 'my',
            italic: true,
          },
        ],
      },
      {
        text: ' ',
      },
      {
        text: 'opinions!)',
        italic: true,
      },
      {
        text: 'Before creating Slate, I tried a lot of the other rich text libraries out there—',
      },
      {
        type: 'link',
        url: 'https://facebook.github.io/draft-js/',
        id: 'e894d8cd-68c7-4701-a183-e63c26793edb',
        children: [
          {
            text: 'Draft.js',
            bold: true,
          },
        ],
      },
      {
        text: ', ',
      },
      {
        type: 'link',
        url: 'http://prosemirror.net/',
        id: '28842a06-63b4-4943-878b-8f909e817f41',
        children: [
          {
            text: 'Prosemirror',
            bold: true,
          },
        ],
      },
      {
        text: ', ',
      },
      {
        type: 'link',
        url: 'http://quilljs.com/',
        id: '3ec1a93e-7e1d-40f8-a9d7-3305dd8358b7',
        children: [
          {
            text: 'Quill',
            bold: true,
          },
        ],
      },
      {
        text: ', etc. What I found was that while getting simple examples to work was easy enough, once you started trying to build something like ',
      },
      {
        type: 'link',
        url: 'https://medium.com/',
        id: 'b4417127-3641-486b-8dda-b932d083b6e7',
        children: [
          {
            text: 'Medium',
          },
        ],
      },
      {
        text: ', ',
      },
      {
        type: 'link',
        url: 'https://www.dropbox.com/paper',
        id: 'f1b9a571-106c-46ed-8247-b99fedfb7a2a',
        children: [
          {
            text: 'Dropbox Paper',
          },
        ],
      },
      {
        text: ' or ',
      },
      {
        type: 'link',
        url: 'https://www.google.com/docs/about/',
        id: 'edca47ad-b339-4e41-a145-bdc3703ec0c7',
        children: [
          {
            text: 'Google Docs',
          },
        ],
      },
      {
        text: ", you ran into deeper issues...Of course not every editor exhibits all of these issues, but if you've tried using another editor you might have run into similar problems. To get around the limitations of their APIs and achieve the user experience you're after, you have to resort to very hacky things. And some experiences are just plain impossible to achieve.If that sounds familiar, you might like Slate.Which brings me to how Slate solves all of that...",
      },
    ],
  },
  {
    type: 'block-quote',
    id: '53052c22-5f46-49f6-b60a-d7d0846a8cca',
    children: [
      {
        text: '🤖 ',
      },
      {
        text: 'Slate is currently in beta',
        bold: true,
      },
      {
        text: '. Its core API is usable now, but you might need to pull request fixes for advanced use cases. Some of its APIs are not "finalized" and will (breaking) change over time as we find better solutions.',
      },
    ],
  },
  {
    type: 'bulleted-list',
    id: '21bd9e32-09dc-4de1-80b8-ad2f5e4703ac',
    children: [
      {
        type: 'list-item',
        id: '9c92900d-15d9-417f-802d-bf9bd49cc306',
        children: [
          {
            text: 'The editor\'s "schema" was hardcoded and hard to customize.',
            bold: true,
          },
          {
            text: ' Things like bold and italic were supported out of the box, but what about comments, or embeds, or even more domain-specific needs?',
          },
        ],
      },
      {
        type: 'list-item',
        id: '8f323747-b61e-4308-a778-4b165b1fad1f',
        children: [
          {
            text: 'Transforming the documents programmatically was very convoluted.',
            bold: true,
          },
          {
            text: ' Writing as a user may have worked, but making programmatic changes, which is critical for building advanced behaviors, was needlessly complex.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '86b14f1e-8237-4d91-9e6c-b786b0eb49cf',
        children: [
          {
            text: 'Serializing to HTML, Markdown, etc. seemed like an afterthought.',
            bold: true,
          },
          {
            text: ' Simple things like transforming a document to HTML or Markdown involved writing lots of boilerplate code, for what seemed like very common use cases.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '0f3757ce-b977-4c66-aeb1-aa4a7807ef2c',
        children: [
          {
            text: 'Re-inventing the view layer seemed inefficient and limiting.',
            bold: true,
          },
          {
            text: ' Most editors rolled their own views, instead of using existing technologies like React, so you had to learn a whole new system with new "gotchas".',
          },
        ],
      },
      {
        type: 'list-item',
        id: 'dac7d595-73d7-4300-8b62-fad240aadce7',
        children: [
          {
            text: "Collaborative editing wasn't designed for in advance.",
            bold: true,
          },
          {
            text: " Often the editor's internal representation of data made it impossible to use for a realtime, collaborative editing use case without basically rewriting the editor.",
          },
        ],
      },
      {
        type: 'list-item',
        id: 'a5bac46e-5541-4310-a12c-3a3b69d76930',
        children: [
          {
            text: 'The repositories were monolithic, not small and reusable.',
            bold: true,
          },
          {
            text: " The code bases for many of the editors often didn't expose the internal tooling that could have been re-used by developers, leading to having to reinvent the wheel.",
          },
        ],
      },
      {
        type: 'list-item',
        id: '79eb0f5c-d434-410c-bd8f-8512670f017d',
        children: [
          {
            text: 'Building complex, nested documents was impossible.',
            bold: true,
          },
          {
            text: ' Many editors were designed around simplistic "flat" documents, making things like tables, embeds and captions difficult to reason about and sometimes impossible.',
          },
        ],
      },
    ],
  },
  {
    id: '6f9ca2c4-7bcd-44c0-aede-68ba5b41972d',
    type: 'callout',
    children: [
      {
        text: 'To get a sense for how you might use Slate, check out a few of the examples:',
      },
    ],
    isVoid: false,
  },
  {
    id: 'ba39955d-d0b2-46ee-b61e-bc88b80ad6d5',
    type: 'paragraph',
    isVoid: false,
    children: [
      {
        text: 'Each example includes a ',
      },
      {
        text: 'View Source',
        bold: true,
      },
      {
        text: ' link to the code that implements it. And we have ',
      },
      {
        type: 'link',
        url: 'https://github.com/ianstormtaylor/slate/tree/master/site/examples',
        id: '79671f36-e565-4af0-a80a-33bafa4c900e',
        children: [
          {
            text: 'other examples',
          },
        ],
      },
      {
        text: ' too.If you have an idea for an example that shows a common use case, pull request it!',
      },
    ],
  },
  {
    type: 'heading-two',
    id: 'a512cff4-76ef-47bb-ba3c-ed5b9a7bcf11',
    children: [
      {
        text: 'Examples',
      },
      {
        type: 'link',
        url: '#examples',
        id: 'af96476f-7d32-418d-905e-b4f359b03737',
        children: [
          {
            text: '',
          },
        ],
      },
      {
        text: '',
      },
    ],
    isVoid: false,
  },
  {
    type: 'bulleted-list',
    id: '0eb8829b-e5b6-44e1-9a84-59928e199f54',
    children: [
      {
        type: 'list-item',
        id: 'a761a28e-8cb3-4f69-90e5-98a74b11c257',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/plaintext',
            id: '47a2cd3e-4b9e-4248-a8fd-450c40199fc6',
            children: [
              {
                text: 'Plain text',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing the most basic case: a glorified ',
          },
          {
            text: '<textarea>',
            code: true,
          },
          {
            text: '.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '50273c0a-b011-4c26-9087-6681083b35c6',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/richtext',
            id: '8a890836-7198-47d2-ad16-f28d3a2ad285',
            children: [
              {
                text: 'Rich text',
                bold: true,
              },
            ],
          },
          {
            text: " — showing the features you'd expect from a basic editor.",
          },
        ],
      },
      {
        type: 'list-item',
        id: 'd8f15aa8-9ac3-4885-90fa-12b19de82094',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/markdown-preview',
            id: '8001f2cf-926e-414c-a765-2fd8ad78a7d8',
            children: [
              {
                text: 'Markdown preview',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how to add key handlers for Markdown-like shortcuts.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '61785f4a-2f9d-4b13-b83c-198731246dd6',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/inlines',
            id: '34b098cd-49cf-4238-b03b-4ddeca4b6c5c',
            children: [
              {
                text: 'Inlines',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how to wrap text in inline nodes with associated data.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '7629449d-2f2f-44c3-ba20-e5b16740ffa5',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/images',
            id: '7c038626-6c55-43cb-80af-9b5c2e424038',
            children: [
              {
                text: 'Images',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how to use void (text-less) nodes to add images.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '747cb45d-63e2-42a1-b6b7-620114fb1dce',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/hovering-toolbar',
            id: 'b39ff4c8-0caa-496d-add6-38953e00cad0',
            children: [
              {
                text: 'Hovering toolbar',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how a contextual hovering menu can be implemented.',
          },
        ],
      },
      {
        type: 'list-item',
        id: 'ed66d68d-0869-46f2-aa65-5eaa0af6c9dc',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/tables',
            id: '20744a94-057a-4443-93af-109217c76722',
            children: [
              {
                text: 'Tables',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how to nest blocks to render more advanced components.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '01056eb3-3215-4719-8e80-e9cb056a559d',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/paste-html',
            id: 'cd0f8950-f16b-44df-94de-fa31f7bf45a7',
            children: [
              {
                text: 'Paste HTML',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how to use an HTML serializer to handle pasted HTML.',
          },
        ],
      },
      {
        type: 'list-item',
        id: '184e9bbc-b961-49eb-8161-2278d104c6cd',
        children: [
          {
            text: '',
          },
          {
            type: 'link',
            url: 'https://www.slatejs.org/examples/mentions',
            id: '1db363ce-2a56-46e8-8fa6-8bcfa2044126',
            children: [
              {
                text: 'Mentions',
                bold: true,
              },
            ],
          },
          {
            text: ' — showing how to use inline void nodes for simple @-mentions.',
          },
        ],
      },
    ],
  },
  {
    id: '81e35c01-fad0-4af1-91e5-bc66e398e1ea',
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const ContentPage = () => {
  return (
    <div className={s.main}>
      <YoptaRenderer data={exampleData} wrapCls={s.editorWrapper} />
    </div>
  );
};

export default ContentPage;
