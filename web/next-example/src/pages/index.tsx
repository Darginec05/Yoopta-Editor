import { createYooptaEditor } from '@yoopta/editor';

import { useEffect, useMemo, useRef } from 'react';
import NextLink from 'next/link';
import { ExpandIcon, CodeIcon, StarIcon, Send, Code2Icon, FileHeart } from 'lucide-react';
import { Head } from '@/components/Head/Head';
import { LandingEditor } from '@/components/LandingEditor/LandingEditor';

export default function Home() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  useEffect(() => {
    editor.on('change', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div
      className="w-full h-auto min-h-[100vh] text-white animate-gradient"
      style={{
        // background: 'linear-gradient(-45deg, #181c21, #050507, #1f333a, #03020a)',
        // background: 'radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%)',
        background: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)',
        animation: ' gradient 15s ease infinite',
        backgroundSize: '400% 400%',
      }}
    >
      <Head />
      <header className="border-b border-b-muted-foreground flex items-center justify-between py-4 px-6">
        <NextLink
          href="https://github.com/Darginec05/Yoopta-Editor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <div className="rounded-full bg-white relative w-[42px] h-[42px]">
            <img
              src="/yoopta-logo.png"
              width={42}
              height={42}
              alt="yooptae editor logo"
              className="absolute top-0 left-0"
            />
          </div>
          <span className="text-white text-base">opta :D</span>
        </NextLink>
        <div className="flex items-center">
          <NextLink
            href="https://yoodocs.space/yoopta-editor/yoopta/introduction-rsK_1fODIL"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 flex items-center"
          >
            Docs
            <FileHeart size={15} className="ml-2" color="#1f6feb" />
          </NextLink>
          <NextLink href="/examples/withBaseFullSetup" className="mr-4 flex items-center">
            Examples
            <Code2Icon size={15} className="ml-2" color="#00ca56" />
          </NextLink>
          <NextLink
            href="https://github.com/sponsors/Darginec05"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 flex items-center"
          >
            Sponsor us <span className="ml-2">💖</span>
          </NextLink>
          <NextLink
            href="https://github.com/Darginec05/Yoopta-Editor"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 flex items-center"
          >
            Give us star
            <StarIcon size={15} className="ml-2" fill="#faca15" color="#faca15" />
          </NextLink>
          <NextLink
            href="https://t.ly/8u0T9"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 flex items-center"
          >
            Community
            <Send size={15} className="ml-2" color="#2e9fdc" />
          </NextLink>
        </div>
      </header>
      <div className="mt-10 md:w-[70%] md:mx-auto flex flex-col items-center">
        <h1 className="text-center scroll-m-20 text-4xl font-bold tracking-tight">Meet Yoopta-Editor 🚀</h1>
        <p className="mt-6 md:w-[750px] text-base text-[#dae2ed] text-center">
          Open-source rich-text-editor that really{' '}
          <u>
            <b>rich</b>
          </u>
          . Install and use it in your project. It's easy to use and easy to customize. Just chill, we are aiming
          resolve all your problems with rich-text-editors.
        </p>
        <div ref={selectionRef} className="mt-4 flex flex-col items-center">
          <button
            onClick={() => {
              editor.focus();
            }}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#1f6feb] text-primary-foreground shadow hover:bg-[#1f6feb]/90 h-9 px-4 py-2"
          >
            Play with live demo 👇
          </button>
          <div className="relative min-h-[400px] max-h-[800px] overflow-y-auto my-4 mx-auto border md:w-[870px] pb-4 pt-2 rounded-sm flex justify-center bg-[#fafafa] text-black">
            <div
              className="text-[#4d494d] absolute top-0 left-0 w-full z-10 px-2 bg-[#252b2f]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0))',
              }}
            >
              <button className="bg-[#00ca56] rounded-full border-[#14ae46] w-[14px] h-[14px] relative">
                <ExpandIcon
                  size={8}
                  color="#ebebeb"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </button>
              <NextLink
                href="https://github.com/Darginec05/Yoopta-Editor/tree/master/web/next-example/src/components/LandingEditor/LandingEditor.tsx"
                target={'_blank'}
                rel={'noopener noreferrer'}
                className="bg-[#1f6feb] inline-block rounded-full border-[#1f6feb] w-[14px] h-[14px] relative ml-1"
              >
                <CodeIcon
                  size={8}
                  color="#ebebeb"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </NextLink>
            </div>
            <LandingEditor editor={editor} selectionRef={selectionRef} />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-center font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Sponsors
          </h2>
          <p className="mt-0 text-center text-muted-foreground w-[700px] text-[#dae2ed] mx-auto">
            Your sponsorship motivates me to work and improve the project, and also helps me bring all my ideas to
            completion. Please consider becoming our sponsor. Thanks in advance 💙
          </p>
          <div className="w-full flex justify-center mt-2">
            <img
              src="/hold-up-let-him-cook.gif"
              height={150}
              width={400}
              loading="lazy"
              className="w-[400px] h-[250px]"
              alt="Bring my ideas to world"
            />
          </div>
          <div>
            <h4 className="text-center mt-4 text-lg font-semibold">Special sponsors</h4>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Plans for future. Roadmap
          </h2>
        </div>
        {/* <div className="mt-4">
          <h2 className="font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Used by
          </h2>
        </div> */}
      </div>
    </div>
  );
}
