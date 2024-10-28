// import { HtmlPreview } from '@/components/parsers/html/HtmlPreview/HtmlPreview';
import dynamic from 'next/dynamic';

const HtmlPreview = dynamic(
  () => import('@/components/parsers/html/HtmlPreview/HtmlPreview').then((mod) => mod.HtmlPreview),
  { ssr: false },
);

const Html = () => {
  return <HtmlPreview />;
};

export default Html;
