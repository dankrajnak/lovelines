import { useState, useRef, useEffect } from "react";

const FadeIn: React.FunctionComponent<{
  fadeS?: number;
  rootMargin?: string;
}> = ({ children, fadeS = 1, rootMargin = "-20% 0 -40% 0" }) => {
  const [isVisible, setVisible] = useState(false);

  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ref = domRef.current!;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisible(entries[0].isIntersecting);
      },
      { rootMargin, threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      observer.unobserve(ref);
    };
  }, [rootMargin]);

  return (
    <>
      <div
        ref={domRef}
        className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      >
        {children}
      </div>
      <style jsx>{`
        .fade-in-section {
          opacity: 0;
          transition: opacity 1s ease;
          will-change: opacity, visibility;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transition: opacity ${fadeS}s ease;
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default FadeIn;
