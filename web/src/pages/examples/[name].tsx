import { ExampleList } from '@/components/ExampleList/ExampleList';
import { readdirSync } from 'fs';
import { join } from 'path';

import withBasicExample from '../../examples/withBasicExample';
import withChatGPT from '../../examples/withChatGPT';
import withCustomActionMenuList from '../../examples/withCustomActionMenuList';
import withCustomComponent from '../../examples/withCustomComponent';
import withCustomToolbar from '../../examples/withCustomToolbar';
import withDarkTheme from '../../examples/withDarkTheme';
import withJustRender from '../../examples/withJustRender';
import withMediumExample from '../../examples/withMediumExample';
import withNotionExample from '../../examples/withNotionExample';
import withCustomHTMLAttributes from '../../examples/withCustomHTMLAttributes';
import withCustomPlugin from '../../examples/withCustomPlugin';
import withExtendedPlugin from '../../examples/withExtendedPlugin';
import withOffline from '../../examples/withOffline';
import withCustomMark from '../../examples/withCustomMark';

const EXAMPLES = {
  withBasicExample,
  withChatGPT,
  withCustomActionMenuList,
  withCustomComponent,
  withCustomToolbar,
  withDarkTheme,
  withJustRender,
  withMediumExample,
  withNotionExample,
  withCustomHTMLAttributes,
  withCustomPlugin,
  withExtendedPlugin,
  withOffline,
  withCustomMark,
};

const ExampleComponent = ({ example, links }: { example: keyof typeof EXAMPLES; links: string[] }) => {
  const ExampleComponent = EXAMPLES[example];

  return (
    <div>
      <ExampleList links={links} />
      <ExampleComponent />
    </div>
  );
};

const examplePath = join(process.cwd(), '/src/examples');

export async function getStaticPaths() {
  const slugs = readdirSync(examplePath);
  const paths = slugs.filter((name) => name.match(/.tsx$/)).map((n) => n.replace(/.tsx$/, ''));

  return {
    paths: paths.map((path) => ({
      params: {
        name: path,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { name: string; paths: string[] } }) {
  return {
    props: {
      example: params.name,
      links: Object.keys(EXAMPLES),
    },
  };
}

export default ExampleComponent;
