import { YoptaRenderer } from 'yopta-editor';
import s from '../../styles/Home.module.scss';

const exampleData = [
  {
    type: 'heading-one',
    id: 'f4919e9d-97dd-4970-a4b4-1f41768f3701',
    children: [
      {
        text: 'Interfaces',
      },
    ],
  },
  {
    id: '4891990e-5157-44ed-aac1-6c4ea36c344b',
    type: 'paragraph',
    children: [
      {
        text: 'Slate works with pure JSON objects. All it requires is that those JSON objects conform to certain interfaces. For example, a text node in Slate must obey the ',
      },
      {
        text: 'Text',
        code: true,
      },
      {
        text: ' interface:',
      },
    ],
  },
  {
    type: 'code',
    id: '784c066c-6d83-43fa-ba1c-a9953897ec55',
    children: [
      {
        text: 'public class Main {\n  int x = 5;\n\n  public static void main(String[] args) {\n    Main myObj1 = new Main();  // Object 1\n    Main myObj2 = new Main();  // Object 2\n    System.out.println(myObj2.x);\n  }\n}',
      },
    ],
  },
  {
    id: '5f5b0c7c-23de-4241-9d0d-3c5941a2bcfe',
    type: 'paragraph',
    children: [
      {
        text: 'Which means it must have a ',
      },
      {
        text: 'text',
        code: true,
      },
      {
        text: ' property with a string of content.But ',
      },
      {
        text: 'any',
        bold: true,
      },
      {
        text: ' other custom properties are also allowed, and completely up to you. This lets you tailor your data to your specific domain and use case, adding whatever formatting logic you\'d like, without Slate getting in the way.This interface-based approach separates Slate from most other rich text editors which require you to work with their hand-rolled "model" classes and makes it much easier to reason about. It also means that it avoids startup time penalties related to "initializing" the data model.',
      },
    ],
  },
  {
    id: '18dc6700-b9e3-4f2c-9ac6-b4601d654d6f',
    type: 'code',
    children: [
      {
        text: "const paragraph = {  type: 'paragraph',  children: [...],};\nconst link = {  type: 'link',  url: 'https://example.com', children: [...]}",
      },
    ],
    isVoid: false,
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
