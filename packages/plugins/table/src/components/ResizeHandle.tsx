import { useEffect, useRef } from 'react';

const ResizeHandle = ({ onResize, tableElement, rows, columnIndex }) => {
  const resizeRef = useRef<HTMLDivElement>(null);
  const startWidth = useRef(0);
  const startX = useRef(0);

  useEffect(() => {
    const tableEl = document.querySelector('.yoopta-table') as HTMLElement;
    if (!tableEl) return;

    const tableHeight = tableEl?.offsetHeight;
    if (!resizeRef.current) return;

    resizeRef.current.style.height = `${tableHeight}px`;
  }, [rows]);

  useEffect(() => {
    const handleMouseDown = (e) => {
      startX.current = e.clientX;
      startWidth.current = tableElement.props.columns[columnIndex].width;

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
  }, [columnIndex, tableElement.props.columns]);

  return (
    <div ref={resizeRef} className="resize-handle" contentEditable={false}>
      <div className="resize-handle-inner" contentEditable={false} />
    </div>
  );
};

export { ResizeHandle };
