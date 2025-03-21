
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  animation?: 'fade-in' | 'fade-up' | 'scale-in' | 'blur-in' | 'slide-in-right' | 'slide-in-left';
  once?: boolean;
  threshold?: number;
}

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = 'fade-up',
  once = true,
  threshold = 0.1,
  ...props
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!once || !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, once, hasAnimated, threshold]);

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'fade-up': 'animate-fade-up',
    'scale-in': 'animate-scale-in',
    'blur-in': 'animate-blur-in',
    'slide-in-right': 'animate-slide-in-right',
    'slide-in-left': 'animate-slide-in-left',
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationFillMode: 'forwards',
        animationDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
