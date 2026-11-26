import React, { useEffect, useRef, useState } from 'react';

export type ViewportPreset = 'desktop' | 'fluid' | 'mobile';

interface ScaledViewportProps {
  preset: ViewportPreset;
  height?: number;
  children: React.ReactNode;
}

export const ScaledViewport: React.FC<ScaledViewportProps> = ({
  preset,
  height = 680,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(440);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      setContainerWidth(el.clientWidth || 440);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (preset === 'fluid') {
    return (
      <div
        ref={containerRef}
        className="w-full overflow-hidden bg-white"
        style={{ height: `${height}px` }}
      >
        <div className="w-full h-full">{children}</div>
      </div>
    );
  }

  const targetWidth = preset === 'desktop' ? 1280 : 390;
  const scale = Math.min(1, containerWidth / targetWidth);
  const targetHeight = Math.round(height / scale);
  const needsCentering = preset === 'mobile' && containerWidth > targetWidth;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-slate-100"
      style={{ height: `${height}px` }}
    >
      <div
        className={needsCentering ? 'mx-auto border-x border-slate-200 bg-white shadow-sm' : 'bg-white'}
        style={{
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: needsCentering ? 'top center' : 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
};
