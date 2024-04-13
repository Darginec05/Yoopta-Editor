import { SlackChat } from '../Chats/SlackChat/SlackChat';

function withBasicUsageExample() {
  return (
    <div className="md:p-[80px] px-[20px] pt-[80px] pb-[40px] flex flex-col items-center justify-center">
      <div className="mb-4">
        <h1 className="text-lg">You can even create chats using Yoopta-Editor!</h1>
        <p>Let's check example for slack chat</p>
      </div>
      <SlackChat />
    </div>
  );
}

export default withBasicUsageExample;
