import { useLayoutEffect, useMemo, useState } from "react";

const useFullScreen = (): { width: number; height: number } => {
  const safeWindow = typeof window === "undefined" ? ({} as any) : window;

  const [width, setWidth] = useState(safeWindow?.innerWidth || 0);
  const [height, setHeight] = useState(safeWindow?.innerHeight || 0);

  useLayoutEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  return useMemo(() => ({ width, height }), [height, width]);
};

export default useFullScreen;
