const Resizer = ({ position }) => (
  <div
    contentEditable={false}
    className={`absolute pointer-events-none flex items-center justify-center z-10 opacity-1 h-full w-[15px] cursor-col-resize transition-opacity duration-150 ease-in ${
      position === 'left' ? 'left-0 top-0' : 'right-0 top-0'
    }`}
  >
    <div className="opacity-100 transition-opacity duration-300 ease-in rounded-[20px] bg-[rgba(15,15,15,0.6)] border border-[rgba(255,255,255,0.9)] w-[6px] h-[48px] max-h-[50%] shadow-[0_0_0_.5px_#FFF]" />
  </div>
);

export { Resizer };
