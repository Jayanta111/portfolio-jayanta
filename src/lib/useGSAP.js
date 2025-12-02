import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function useGSAP(callback, deps = []) {
  const ctx = useRef();

  useLayoutEffect(() => {
    ctx.current = gsap.context(callback);
    return () => ctx.current.revert();
  }, deps);

  return ctx;
}
