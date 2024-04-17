import withBaseFullSetup from '@/components/examples/withBaseFullSetup';
// import withCustomComponent from '@/components/examples';
// import withOffline from '@/components/examples/withOffline';
// import withExports from '@/components/examples/withExports';
// import { CheckSourceCode } from '@/components/CheckSourceCode/CheckSourceCode';
import withCustomHTMLAttributes from '@/components/examples/withCustomHTMLAttributes';
import withCustomMark from '@/components/examples/withCustomMark';
import withCustomPlugin from '@/components/examples/withCustomPlugin';
import withCustomToolbar from '@/components/examples/withCustomToolbar';
import withDarkTheme from '@/components/examples/withDarkTheme';
import withExtendedPlugin from '@/components/examples/withExtendedPlugin';
import withMedia from '@/components/examples/withMedia';
import withNotionActionMenu from '@/components/examples/withNotionActionMenu';
import withReadOnly from '@/components/examples/withReadOnly/index';
import withSavingToDatabase from '@/components/examples/withSavingToDatabase';
import withEditorControl from '@/components/examples/withEditorControl';
import withLargeDocuments from '@/components/examples/withLargeDocuments';
import withChatSlack from '@/components/examples/withChatSlack';
import withCraftExample from '@/components/examples/withCraftExample';
import withCustomStyles from '@/components/examples/withCustomStyles';
import withMigrationGuide from '@/components/examples/withMigrationGuide';

import { Head } from '@/components/Head/Head';
import { Sheet } from '@/components/ui/sheet';
import { useRouter } from 'next/router';

export const EXAMPLES: Record<string, () => React.JSX.Element> = {
  withBaseFullSetup,
  withCustomToolbar,
  withNotionActionMenu,
  withDarkTheme,
  withMedia,
  withExtendedPlugin,
  withReadOnly,
  withCustomHTMLAttributes,
  withCustomMark,
  withCustomPlugin,
  withSavingToDatabase,
  withCustomStyles,
  withEditorControl,
  withLargeDocuments,
  withChatSlack,
  withCraftExample,
  withMigrationGuide,
  // withExports,
  // withOffline,
  // withCustomComponent,
};

const EXAMPLE_MAP: Record<keyof typeof EXAMPLES, any> = {
  withBaseFullSetup: {
    title: 'All-in example',
    description: '',
  },
  withCustomToolbar: {
    title: 'Custom Toolbar',
    description: '',
  },
  withNotionActionMenu: {
    title: 'Notion Action Menu',
    description: '',
  },
  withDarkTheme: {
    title: 'Dark Theme',
    description: '',
  },
  withMedia: {
    title: 'Media',
    description: '',
  },
  withExtendedPlugin: {
    title: 'Extended Plugin',
    description: '',
  },
  withReadOnly: {
    title: 'Read Only',
    description: '',
  },
  withCustomMark: {
    title: 'Custom Mark',
    description: '',
  },
  withCustomPlugin: {
    title: 'Custom Plugin',
    description: '',
  },
  withCustomHTMLAttributes: {
    title: 'Custom HTML Attributes',
    description: '',
  },
  withSavingToDatabase: {
    title: 'Saving to Database',
    description: '',
  },
  withCustomStyles: {
    title: 'Custom Styles',
    description: '',
  },
  withEditorControl: {
    title: 'Editor Control',
    description: '',
  },
  withLargeDocuments: {
    title: 'Large Documents',
    description: '',
  },
  withChatSlack: {
    title: 'Chat Slack',
    description: '',
  },
  withCraftExample: {
    title: 'Craft Example',
    description: '',
  },
  withMigrationGuide: {
    title: 'Migration Guide from v2 to v4',
    description: '',
  },
};

const ExampleComponent = () => {
  const router = useRouter();
  const ExampleComponent = EXAMPLES[(router.query.example as string) || 'withBaseFullSetup'];

  const exampleList = Object.keys(EXAMPLES).map((key) => ({
    id: key,
    title: EXAMPLE_MAP[key].title,
    description: EXAMPLE_MAP[key].description,
    href: `/examples/${key}`,
  }));

  return (
    <div>
      <Head />
      {/* <CheckSourceCode example={example} /> */}
      <ExampleComponent />
      <Sheet items={exampleList} path={router.asPath} />
    </div>
  );
};

export default ExampleComponent;
