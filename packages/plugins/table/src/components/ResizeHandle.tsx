import { useEffect, useRef } from 'react';

const ResizeHandle = ({ onResize, onResizeStop }) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const startWidth = useRef(0);
  const resizeWidth = useRef(0);
  const startX = useRef(0);

  useEffect(() => {
    const table = document.querySelector('.yoopta-table table') as HTMLElement;
    if (!table) return;

    const tableHeight = table?.offsetHeight;
    if (!resizeRef.current) return;

    resizeRef.current.style.height = `${tableHeight}px`;
  }, []);

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startWidth.current = resizeRef.current ? resizeRef.current.offsetWidth : 0;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const currentX = e.clientX;
    const newWidth = startWidth.current + (currentX - startX.current);
    resizeWidth.current = newWidth;
    onResize(newWidth);
  };

  const handleMouseUp = () => {
    onResizeStop(resizeWidth.current);
    resizeWidth.current = 0;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={resizeRef}
      onMouseDown={handleMouseDown}
      contentEditable={false}
      className="absolute right-0 w-0 top-0 flex-grow-0 h-full z-[1]"
    >
      <div className="absolute w-[3px] -ml-[1px] -mt-[1px] h-[calc(100%+2px)] transition-[background] duration-[150ms] delay-[50ms] hover:bg-[#74b6db] bg-[#2383e200] cursor-col-resize"></div>
    </div>
  );
};

export { ResizeHandle };
