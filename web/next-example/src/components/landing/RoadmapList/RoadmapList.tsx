import { Card } from '../Card/Card';

export const RoadmapList = () => {
  return (
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
  );
};
