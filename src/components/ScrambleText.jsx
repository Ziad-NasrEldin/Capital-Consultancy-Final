import { useState, useRef, useEffect, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * ScrambleText — attaches to its parent element's mouseenter/mouseleave
 * to run a character-scramble animation, resolving left-to-right.
 */
export default function ScrambleText({ text, className, style }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);
  const spanRef = useRef(null);
  const textRef = useRef(text);
  textRef.current = text;

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const original = textRef.current;
    const chars = original.split('');
    let frame = 0;
    const framesPerChar = 4; // how many frames each character "holds" before resolving

    const tick = () => {
      const resolved = Math.floor(frame / framesPerChar);
      const result = chars.map((char, i) => {
        if (char === ' ') return ' ';
        if (i < resolved) return chars[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });
      setDisplay(result.join(''));
      frame++;
      if (resolved < chars.length) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(original);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setDisplay(textRef.current);
  }, []);

  useEffect(() => {
    const el = spanRef.current?.parentElement;
    if (!el) return;
    el.addEventListener('mouseenter', scramble);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mouseenter', scramble);
      el.removeEventListener('mouseleave', reset);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scramble, reset]);

  return (
    <span ref={spanRef} className={className} style={style}>
      {display}
    </span>
  );
}
