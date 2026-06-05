import { useState, useEffect, useRef } from "react";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
  // main itself doesn't scroll — the first overflow-y-auto child does
  const container =
    document.querySelector<HTMLElement>("main > div") ??
    document.querySelector<HTMLElement>("main");

  if (!container) return;

  const handleScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollable = scrollHeight - clientHeight;
      if (scrollable <= 0) { setProgress(0); return; }
      setProgress((scrollTop / scrollable) * 100);
    });
  };

  container.addEventListener("scroll", handleScroll, { passive: true });
  setProgress(0);

  return () => {
    container.removeEventListener("scroll", handleScroll);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-[#ff831c]"
        style={{
          width: `${progress}%`,
          transition: "width 120ms linear",  // inline — more precise than Tailwind class
        }}
      />
    </div>
  );
};

export default ReadingProgress;