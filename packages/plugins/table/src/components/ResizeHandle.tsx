import { useEffect, useRef } from 'react';

const ResizeHandle = ({ onResize, tdWidth, columnIndex }) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const startWidth = useRef(0);
  const startX = useRef(0);

  useEffect(() => {
    // [TODO] - Get by table id
    const tableEl = document.querySelector('.yoopta-table') as HTMLElement;
    if (!tableEl) return;

    const tableHeight = tableEl?.offsetHeight;
    if (!resizeRef.current) return;

    resizeRef.current.style.height = `${tableHeight}px`;
  }, []);

  useEffect(() => {
    const tableEl = document.querySelector('.yoopta-table') as HTMLElement;
    if (!tableEl) return;

    const handleMouseDown = (e) => {
      const tableHeight = tableEl?.offsetHeight;
      if (!resizeRef.current) return;
      resizeRef.current.style.height = `${tableHeight}px`;

      startX.current = e.clientX;
      startWidth.current = tdWidth;

      const handleMouseMove = (event) => {
        const currentX = event.clientX;
        const newWidth = startWidth.current + (currentX - startX.current);

        onResize(newWidth);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    resizeRef.current?.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizeRef.current?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [columnIndex, tdWidth]);

  return (
    <div ref={resizeRef} className="yoopta-table-resize-handle" contentEditable={false}>
      <div className="yoopta-table-resize-handle-inner" contentEditable={false} />
    </div>
  );
};

export { ResizeHandle };
