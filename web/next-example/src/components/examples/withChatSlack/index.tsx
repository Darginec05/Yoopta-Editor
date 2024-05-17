import { SlackChat } from '../../Chats/SlackChat/SlackChat';

function WithSlackChatExample() {
  return (
    <div className="md:py-[100px] md:pl-[200px] md:pr-[80px] px-[20px] pt-[80px] pb-[40px] flex flex-col items-center justify-center">
      <div className="mb-8">
        <h1 className="mt-6 scroll-m-20 text-4xl font-bold tracking-tight lg:text-3x">
          You can even create chats using Yoopta-Editor!
        </h1>
        <p className="text-xl mt-2">Let's check example for slack chat</p>
      </div>
      <SlackChat />
    </div>
  );
}

export default WithSlackChatExample;
