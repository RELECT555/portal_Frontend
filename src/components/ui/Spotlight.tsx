import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import type { SpringOptions } from 'framer-motion';
import classnames from 'classnames';

interface SpotlightProps {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
}

export const Spotlight: React.FC<SpotlightProps> = ({
  className,
  size = 200,
  springOptions = { bounce: 0 },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (val: number) => `${val - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (val: number) => `${val - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement],
  );

  useEffect(() => {
    if (!parentElement) return;

    const onEnter = (): void => setIsHovered(true);
    const onLeave = (): void => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', onEnter);
    parentElement.addEventListener('mouseleave', onLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', onEnter);
      parentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={classnames(className)}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at center, rgba(255,255,255,0.35), rgba(255,255,255,0.15) 40%, transparent 80%)',
        filter: 'blur(24px)',
        transition: 'opacity 0.2s ease',
        opacity: isHovered ? 1 : 0,
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
};
