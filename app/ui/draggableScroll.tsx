'use client';

import { useRef, useState } from 'react';

export default function DraggableScroll({
  children,
  className = '',
}: {
  children:  React.ReactNode;
  className?: string;
}) {
  const ref       = useRef<HTMLDivElement>(null);
  const [isDown,  setIsDown]     = useState(false);
  const startX    = useRef(0);
  const scrollLeft = useRef(0);

  function onMouseDown(e: React.MouseEvent) {
    setIsDown(true);
    startX.current    = e.pageX - (ref.current?.offsetLeft ?? 0);
    scrollLeft.current = ref.current?.scrollLeft ?? 0;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDown || !ref.current) return;
    e.preventDefault();
    const x    = e.pageX - (ref.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5; // 1.5 = scroll speed
    ref.current.scrollLeft = scrollLeft.current - walk;
  }

  const stop = () => setIsDown(false);

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stop}
      onMouseLeave={stop}
      className={`
        ${isDown ? 'cursor-grabbing select-none' : 'cursor-grab'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}