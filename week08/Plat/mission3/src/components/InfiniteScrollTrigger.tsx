// src/components/InfiniteScrollTrigger.tsx

import { useEffect, useRef, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";

type InfiniteScrollTriggerProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onIntersect: () => void;
};

export default function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  onIntersect,
}: InfiniteScrollTriggerProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.scrollY;
  });
  const throttledScrollY = useThrottle(scrollY, 1000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const target = triggerRef.current;

    if (!target || !hasNextPage || isFetchingNextPage) return;

    const targetTop = target.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    const prefetchMargin = 200;

    if (targetTop <= viewportHeight + prefetchMargin) {
      onIntersect();
    }
  }, [hasNextPage, isFetchingNextPage, onIntersect, throttledScrollY]);

  return <div ref={triggerRef} className="h-10" />;
}
