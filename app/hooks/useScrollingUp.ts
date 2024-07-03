import { useState, useEffect, useRef } from 'react';
import throttle from 'lodash/throttle';

export default function useScrollingUp(delay = 400) {
  const [position, setPosition] = useState(
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  const [visible, setVisible] = useState(true);

  const positionRef = useRef(position);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleScroll = useRef(
    throttle(() => {
      const moving = window.scrollY;

      setVisible(positionRef.current > moving);
      setPosition(moving);
    }, delay)
  ).current;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return visible;
}
