// src/components/InfiniteScrollTrigger.tsx

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const target = triggerRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          onIntersect();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, onIntersect]);

  return <div ref={triggerRef} className="h-10" />;
}