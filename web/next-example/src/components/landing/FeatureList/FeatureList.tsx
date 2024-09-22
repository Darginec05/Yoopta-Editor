type Feature = {
  title: string;
  description: string;
  icon: string;
  src: string;
};

const features: Feature[] = [
  {
    title: 'Feature 1',
    description: 'Feature 1 description',
    icon: 'Icon 1',
    src: 'Image 1',
  },
  {
    title: 'Feature 2',
    description: 'Feature 2 description',
    icon: 'Icon 2',
    src: 'Image 2',
  },
  {
    title: 'Feature 3',
    description: 'Feature 3 description',
    icon: 'Icon 3',
    src: 'Image 3',
  },
  {
    title: 'Feature 4',
    description: 'Feature 4 description',
    icon: 'Icon 4',
    src: 'Image 4',
  },
  {
    title: 'Feature 4',
    description: 'Feature 4 description',
    icon: 'Icon 4',
    src: 'Image 4',
  },
  {
    title: 'Feature 4',
    description: 'Feature 4 description',
    icon: 'Icon 4',
    src: 'Image 4',
  },
  {
    title: 'Feature 4',
    description: 'Feature 4 description',
    icon: 'Icon 4',
    src: 'Image 4',
  },
  {
    title: 'Feature 4',
    description: 'Feature 4 description',
    icon: 'Icon 4',
    src: 'Image 4',
  },
  {
    title: 'Feature 4',
    description: 'Feature 4 description',
    icon: 'Icon 4',
    src: 'Image 4',
  },
];

export const FeatureList = () => {
  return (
    <div className="mt-6 pb-4 border-b flex max-w-full flex-col items-center gap-6 px-0 md:max-w-screen-md xl:max-w-none">
      <div className="flex max-w-full flex-col items-center text-center md:max-w-screen-md">
        <h2 className="text-center font-heading mt-12 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Why Yoopta-Editor?
        </h2>
        <p className="mt-0 text-center text-muted-foreground md:w-[700px] text-[#dae2ed] mx-auto">asdsadasd</p>
      </div>
      <div className="grid max-w-full grid-cols-1 gap-4 md:max-w-screen-md md:grid-cols-2 xl:max-w-none xl:grid-cols-3 xl:p-0">
        {features.map((feature) => (
          <FeatureListItem key={feature.title} feature={feature} />
        ))}
      </div>
    </div>
  );
};

type FeatureListItemProps = {
  feature: Feature;
};

export const FeatureListItem = ({ feature }: FeatureListItemProps) => {
  return (
    <div className="card relative flex w-[360px] max-w-full flex-col justify-between gap-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 dark:bg-black row-span-2">
      <div className="thumbnail aspect-video w-full overflow-hidden">
        <img
          alt="Works out of the box"
          loading="lazy"
          width="434"
          height="317"
          decoding="async"
          className="block w-full dark:hidden"
          src={feature.src}
        />
      </div>
      <div className="flex flex-col gap-6 p-8">
        <div className="feature-icon h-fit w-fit rounded-lg p-1">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            className="rounded-md"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.95401 2.2106C11.2876 1.93144 12.6807 1.92263 14.0449 2.20785C14.2219 3.3674 14.9048 4.43892 15.9997 5.07103C17.0945 5.70313 18.364 5.75884 19.4566 5.3323C20.3858 6.37118 21.0747 7.58203 21.4997 8.87652C20.5852 9.60958 19.9997 10.736 19.9997 11.9992C19.9997 13.2632 20.5859 14.3902 21.5013 15.1232C21.29 15.7636 21.0104 16.3922 20.6599 16.9992C20.3094 17.6063 19.9049 18.1627 19.4559 18.6659C18.3634 18.2396 17.0943 18.2955 15.9997 18.9274C14.9057 19.559 14.223 20.6294 14.0453 21.7879C12.7118 22.067 11.3187 22.0758 9.95443 21.7906C9.77748 20.6311 9.09451 19.5595 7.99967 18.9274C6.90484 18.2953 5.63539 18.2396 4.54272 18.6662C3.61357 17.6273 2.92466 16.4164 2.49964 15.1219C3.41412 14.3889 3.99968 13.2624 3.99968 11.9992C3.99968 10.7353 3.41344 9.60827 2.49805 8.87524C2.70933 8.23482 2.98894 7.60629 3.33942 6.99923C3.68991 6.39217 4.09443 5.83576 4.54341 5.33257C5.63593 5.75881 6.90507 5.703 7.99967 5.07103C9.09364 4.43942 9.7764 3.3691 9.95401 2.2106ZM11.9997 14.9992C13.6565 14.9992 14.9997 13.6561 14.9997 11.9992C14.9997 10.3424 13.6565 8.99923 11.9997 8.99923C10.3428 8.99923 8.99967 10.3424 8.99967 11.9992C8.99967 13.6561 10.3428 14.9992 11.9997 14.9992Z"></path>
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between gap-2">
            <span className="text-md font-bold">{feature.title}</span>
          </div>
          <div className="text-sm sm:min-h-[3.75rem]">{feature.description}</div>
        </div>
      </div>
    </div>
  );
};
