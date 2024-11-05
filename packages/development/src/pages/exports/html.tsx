import dynamic from 'next/dynamic';

const HtmlPreview = dynamic(
  () => import('@/components/Exports/html/HtmlPreview/HtmlPreview').then((mod) => mod.HtmlPreview),
  { ssr: false },
);

export default function HtmlExports() {
  return <HtmlPreview />;
}
