import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Callout from '@yoopta/callout';
import Headings from '@yoopta/headings';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const plugins = [Paragraph, Blockquote, Callout, Headings.HeadingOne, Headings.HeadingTwo, Headings.HeadingThree];

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dev');
  });

  return null;
};

export default Index;
