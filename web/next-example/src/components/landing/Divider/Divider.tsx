const color = '#f0f0f0';

const Divider = () => {
  return (
    <div className="flex items-center justify-center w-full h-[20px]">
      <div
        className="w-full h-[2px]"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
      />
    </div>
  );
};

export { Divider };
