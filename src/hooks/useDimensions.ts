import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

const useDimensions = (): [
  MutableRefObject<any>,
  DOMRect | undefined | null
] => {
  const ref = useRef<any>();
  const [dimensions, setDimensions] = useState();
  useLayoutEffect(() => {
    setDimensions(ref.current?.getBoundingClientRect().toJSON());
  }, []);
  return [ref, dimensions];
};

export default useDimensions;
