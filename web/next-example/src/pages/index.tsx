import NextLink from 'next/link';
import { StarIcon, Send, Code2Icon, FileHeart, PlusIcon, ExternalLinkIcon } from 'lucide-react';
import { Head } from '@/components/Head/Head';

// Card component with title and description
const Card = ({ title, description }) => {
  return (
    <div className="shadow-lg rounded-lg p-4">
      <h4 className="text-base font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground text-[#dae2ed]m mt-2">{description}</p>
    </div>
  );
};

const GithubButton = ({ repo }) => {
  return (
    <a
      className="md:mt-0 mt-2 items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-6 py-2 max-w-52 overflow-hidden whitespace-pre flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
      target="_blank"
      href="https://github.com/Darginec05/Yoopta-Editor"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
      <div className="flex items-center">
        <svg viewBox="0 0 438.549 438.549" className="size-4">
          <path
            fill="currentColor"
            d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
          ></path>
        </svg>
        <span className="ml-1">Star on GitHub</span>{' '}
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="inline-block tabular-nums tracking-wider font-display font-medium text-white dark:text-black">
          {repo.stargazers_count}
        </span>
      </div>
    </a>
  );
};

const ProductHuntButton = () => {
  return (
    <a
      href="https://www.producthunt.com/posts/yoopta-editor?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-yoopta&#0045;editor"
      target="_blank"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=453627&theme=light"
        alt="Yoopta Editor - The truly open-source rich-text editor | Product Hunt"
        // style="width: 250px; height: 54px;"
        width="250"
        height="36"
        className="w-52 h-9 mt-2 md:mt-0"
      />
    </a>
  );
};

export default function Home({ repoData }) {
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
          <span className="text-white text-base">opta ˆ-ˆ</span>
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
        <div className="flex items-center mt-4 flex-col md:flex-row">
          <ProductHuntButton />
          {repoData && <GithubButton repo={repoData} />}
        </div>
        <p className="mt-6 md:w-[750px] text-base text-[#dae2ed] text-center">
          Open-source rich-text editor that's truly{' '}
          <b>
            <u>rich</u>
          </b>
          . Install and use it in your project. Easy to to use and fully customizable. Just relax, we're here to solve
          all your challenges with rich-text editors.
        </p>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => window.open('/playground', '_blank')}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#1f6feb] text-primary-foreground shadow hover:bg-[#1f6feb]/90 h-9 px-4 py-2"
          >
            Play with live demo <ExternalLinkIcon size={16} className="ml-2" />
          </button>
        </div>
        <div className="mt-4">
          <video className="w-full h-auto" autoPlay loop muted playsInline controls>
            <source src="/Yoopta_Intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-6 pb-4 border-b">
          <h2 className="text-center font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Roadmap 👨‍💻
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
                  Building more{' '}
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
            Sponsorship 💖
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
            <div className="w-full flex-wrap flex justify-center py-2">
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
                href="https://github.com/bluewave-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg m-2"
              >
                <img
                  src="https://avatars.githubusercontent.com/u/165089105?s=200&v=4"
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

export async function getStaticProps() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  async function fetchRepoData({ owner, repo }) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  }

  const repoData = await fetchRepoData({ owner: 'Darginec05', repo: 'Yoopta-Editor' });

  return {
    props: {
      repoData,
    },
  };
}
