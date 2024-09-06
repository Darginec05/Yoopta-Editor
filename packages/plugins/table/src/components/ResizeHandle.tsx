import { useEffect, useRef } from 'react';

const ResizeHandle = ({ onResize, tdWidth, columnIndex }) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const startWidth = useRef(0);
  const startX = useRef(0);

  useEffect(() => {
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
        tableEl.removeEventListener('mousemove', handleMouseMove);
        tableEl.removeEventListener('mouseup', handleMouseUp);
      };

      tableEl.addEventListener('mousemove', handleMouseMove);
      tableEl.addEventListener('mouseup', handleMouseUp);
    };

    resizeRef.current?.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizeRef.current?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [columnIndex, tdWidth]);

  return (
    <div ref={resizeRef} className="resize-handle" contentEditable={false}>
      <div className="resize-handle-inner" contentEditable={false} />
    </div>
  );
};

export { ResizeHandle };
