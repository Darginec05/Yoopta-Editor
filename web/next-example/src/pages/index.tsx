import { createYooptaEditor } from '@yoopta/editor';

import { useEffect, useMemo, useRef } from 'react';
import NextLink from 'next/link';
import { ExpandIcon, CodeIcon, StarIcon, Send, Code2Icon, FileHeart, PlusIcon } from 'lucide-react';
import { Head } from '@/components/Head/Head';
import { LandingEditor } from '@/components/LandingEditor/LandingEditor';

// Card component with title and description
const Card = ({ title, description }) => {
  return (
    <div className="shadow-lg rounded-lg p-4">
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground text-[#dae2ed]m mt-2">{description}</p>
    </div>
  );
};

export default function Home() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  return (
    <div
      className="w-full h-auto min-h-[100vh] text-white animate-gradient"
      style={{
        // background: 'linear-gradient(-45deg, #181c21, #050507, #1f333a, #03020a)',
        background: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, #050507 99.4%)',
        animation: ' gradient 15s ease infinite',
        backgroundSize: '400% 400%',
      }}
    >
      <Head />
      <header className="border-b border-b-muted-foreground flex items-center justify-between py-4 px-6 flex-col md:flex-row">
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
        <div className="flex items-center text-nowrap md:mt-0 mt-3 scale-[.65] md:scale-100">
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
      <div className="mt-10 md:w-[70%] md:mx-auto flex flex-col items-center px-4 md:px-0">
        <h1 className="text-center scroll-m-20 text-4xl font-bold tracking-tight">Meet Yoopta-Editor 🚀</h1>
        <p className="mt-6 md:w-[750px] text-base text-[#dae2ed] text-center">
          Open-source rich-text editor that's truly{' '}
          <b>
            <u>rich</u>
          </b>
          . Install and use it in your project. Easy to to use and fully customizable. Just relax, we're here to solve
          all your challenges with rich-text editors.
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
          <div className="relative min-h-[40vh] max-h-[80vh] overflow-y-auto my-4 mx-auto border md:w-[80vw] pb-4 pt-6 rounded-sm flex justify-center bg-[#fafafa] text-black">
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
        <div className="mt-6">
          <h2 className="text-center font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Our Plans 👨‍💻
          </h2>
          {/* card list */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card
              title="Continue to improve the project"
              description="We're committed to enhancing Yoopta Editor by regularly updating it with new features and improvements based on community feedback."
            />
            <Card
              title={
                <>
                  Building another{' '}
                  <a
                    className="text-[#1f6feb] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Darginec05/Yoopta-Editor/discussions/197"
                  >
                    powerful plugins
                  </a>
                </>
              }
              description="Our roadmap includes the development of innovative plugins that will extend the functionality and versatility of the editor, catering to more specialized content creation needs."
            />
            <Card
              title="Integration of AI-Powered Tools"
              description="We plan to integrate advanced AI tools to provide intelligent editing capabilities, making content creation faster, smarter, and more intuitive."
            />
            <Card
              title="Collabrative editing"
              description="We aim to incorporate advanced AI features to streamline content creation and editing, making the editor smarter and more intuitive."
            />
            <Card
              title="Customization Enhancements"
              description="We aim to integrate real-time collaboration features, allowing multiple users to edit documents simultaneously and see each other's changes live, enhancing teamwork and productivity."
            />
            <Card
              title="Plugin Marketplace"
              description="A one-stop-shop for plugins where developers can share and monetize their own plugins, and users can easily enhance their editor's capabilities."
            />
            {/* <Card
              title="Community Building Initiatives"
              description="From webinars and workshops to meetups—expanding our community support to foster collaboration and learning among users and developers."
            /> */}
            <Card
              title="Open-Source Email Builder"
              description="Plans are underway to develop an open-source email builder that will provide developers and designers with the tools to create responsive, professionally designed emails easily, enhancing how email campaigns are built and managed."
            />
          </div>
          {/* card list using grid */}
        </div>
        <div className="mt-6">
          <h2 className="text-center font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Sponsorship
          </h2>
          <p className="mt-0 text-center text-muted-foreground md:w-[700px] text-[#dae2ed] mx-auto">
            Your sponsorship motivates us to continuously improve the project and helps bring our ideas to fruition.
            Please consider supporting us as a sponsor. Thank you in advance 💙
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
            <h4 className="text-center mt-4 text-lg font-semibold">Current sponsors 💖</h4>
            <div className="w-full flex-wrap flex justify-center border-b py-2">
              <a
                href="https://tapflow.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-18 h-18 rounded-full shadow-lg m-2"
              >
                <img
                  src="https://framerusercontent.com/images/3deWAtwBX6tWvPegfQE2tNf0T0.png"
                  alt="Tapflow logo"
                  className="w-14 h-14 rounded-full"
                />
              </a>
              <a
                href="https://yoodocs.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg m-2"
              >
                <img src="/yoopta-logo.png" alt="Yoodocs logo" className="w-14 h-14 rounded-full" />
              </a>
              <a
                href="https://github.com/chrassendk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg m-2"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/10469954?s=60&v=4"
                  alt="yoopta logo"
                  className="w-14 h-14 rounded-full"
                />
              </a>
              <a
                href="https://github.com/mrfullset"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg m-2"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/98813378?s=60&v=4"
                  alt="yoopta logo"
                  className="w-14 h-14 rounded-full"
                />
              </a>
              <a
                href="https://github.com/sponsors/Darginec05"
                target="_blank"
                rel="noopener noreferrer"
                title="Become sponsor"
                className="flex items-center justify-center w-18 h-18 bg-[#181c21] rounded-full shadow-lg m-2"
              >
                <PlusIcon size={30} color="#1f6feb" className="w-14 h-14 rounded-full animate-pulse" />
              </a>
            </div>
          </div>
        </div>

        {/* <div className="mt-4">
          <h2 className="font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Used by
          </h2>
        </div> */}
        <footer className="border-t mt-8">
          <div className="mt-2 pb-6">
            <p className="text-center text-muted-foreground">
              Created by{' '}
              <a
                href="https://x.com/lebovskiYoo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1f6feb] underline"
              >
                Darginec05
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
