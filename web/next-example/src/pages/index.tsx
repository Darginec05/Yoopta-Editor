import { PlusIcon, ExternalLinkIcon } from 'lucide-react';
import { Head } from '@/components/Head/Head';
import { ProductHuntButton } from '@/components/landing/ProductHuntButton/ProductHuntButton';
import { GithubButton } from '@/components/landing/GithubButton/GithubButton';
import { Card } from '@/components/landing/Card/Card';
import { Header } from '@/components/landing/Header/Header';
import { fetchRepoContributors, fetchRepoData, fetchRepoSponsors, request } from '@/api/request';
import { GithubContributors } from '@/components/landing/GithubContributors/GithubContributors';
import { Contributor, Repository } from '@/components/landing/types';
import { RoadmapList } from '@/components/landing/RoadmapList/RoadmapList';

type Props = {
  repoData: Repository;
  contributors: Contributor[];
  sponsors: any;
};

export default function Home({ repoData, sponsors, contributors }: Props) {
  return (
    <div
      className="w-full h-auto min-h-[100vh] text-white animate-gradient"
      style={{
        background: 'radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, #050507 99.4%)',
        animation: ' gradient 15s ease infinite',
        backgroundSize: '400% 400%',
      }}
    >
      <Head />
      <Header />
      <div className="pt-[72px] md:w-[70%] md:mx-auto flex flex-col items-center px-4 md:px-0">
        <a
          href="https://yoopta.dev/examples/withBaseFullSetup"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-18 h-18 bg-white rounded-full shadow-lg m-2"
        >
          <img src="/yoopta/yoopta-logo.png" alt="Yoopta logo" className="w-14 h-14 rounded-full" />
        </a>
        <h1 className="text-center scroll-m-20 text-4xl font-bold tracking-tight">Meet Yoopta-Editor 🚀</h1>
        <div className="flex items-center mt-4 flex-col md:flex-row">
          <ProductHuntButton />
          {repoData && <GithubButton repo={repoData} />}
        </div>
        <p className="font-space-grotesk text-lg leading-snug md:text-xl mt-6 md:w-[680px] text-[#FFFFFFB2] text-center">
          Open-source rich-text editor that's truly{' '}
          <b>
            <u>rich</u>
          </b>
          . Install and use it in your project. Easy to to use and fully customizable. Just relax, I'm here to solve all
          your challenges with rich-text editors.
        </p>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => window.open('/examples/withBaseFullSetup', '_blank')}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#1f6feb] text-primary-foreground shadow hover:bg-[#1f6feb]/90 h-9 px-4 py-2"
          >
            Play with demo's <ExternalLinkIcon size={16} className="ml-2" />
          </button>
        </div>
        <div className="mt-4">
          <video className="w-full h-auto" autoPlay loop muted playsInline controls>
            <source src="/yoopta/Yoopta_Intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <RoadmapList />
        <div className="mt-6">
          <h2 className="text-center font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Sponsorship 💖
          </h2>
          <p className="mt-0 text-center text-muted-foreground md:w-[700px] text-[#dae2ed] mx-auto">
            Your sponsorship motivates me to continuously improve the project and helps bring our ideas to fruition.
            Please consider supporting me as a sponsor. Thank you in advance 💙
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
                <img src="/yoopta/yoopta-logo.png" alt="Yoopta logo" className="w-14 h-14 rounded-full" />
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

        <GithubContributors contributors={contributors} />
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
  try {
    const options = { owner: 'Darginec05', repo: 'Yoopta-Editor' };

    const [repoData, contributors, sponsors] = await Promise.allSettled([
      fetchRepoData(options),
      fetchRepoContributors(options),
      fetchRepoSponsors(options),
    ]);

    return {
      props: {
        repoData: repoData.value || null,
        contributors: contributors.value || null,
        sponsors: sponsors.value || null,
      },
    };
  } catch (error) {
    console.error('Failed to fetch repo data', error);
    return {
      props: {
        repoData: null,
      },
    };
  }
}
