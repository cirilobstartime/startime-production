'use client'; // This is required for client-side interactions in the App Router

import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Image from 'next/image';

// Use isomorphic layout effect to avoid SSR warnings in Next.js
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HorizontalScrollSection = () => {
  const horizontalSection = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Use gsap.utils.toArray to select all elements with the class '.horizontal-panel'
      const slides = gsap.utils.toArray('.horizontal-panel');

      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1), // Animate the x position to create the scroll effect
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection.current,
          pin: true, // Pin the section while the horizontal scroll happens
          scrub: 1, // Smoothly animate the horizontal movement with scroll
          // end: () => `+=${(horizontalSection.current as HTMLElement).offsetWidth}`, // End the scroll trigger based on container width
        },
      });
    }, horizontalSection); // Scope the GSAP context to the container ref

    return () => ctx.revert(); // Clean up animations on component unmount
  }, []);

  return (
    // The container for the entire horizontal scroll section
    <div ref={horizontalSection} className="horizontal-scroll-container">
      {/* The inner wrapper that will be moved horizontally */}
      <div className="horizontal-wrapper">
        {/* Your individual panels - add more as needed */}
       
        <div className="horizontal-panel"  style={{ position: 'relative', width: '100%', height: '100%' }}>
           <Image
            src="/images/62a2ce07-cc05-4d42-bce9-07461ac429e0.JPG"
            alt="Description of remote image"
            fill
          />


        </div>
        <div className="horizontal-panel" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/images/291bc7b7-7abf-402f-aece-b8c1d4658e8a.JPG"
            alt="Description of remote image"
            fill
          />
        </div>
        <div className="horizontal-panel" style={{ position: 'relative', width: '100%', height: '100%' }}>
           <Image
            src="/images/0b83c0ab-7666-44ec-9c94-01a4b896cc65.JPG"
            alt="Description of remote image"
            fill
          />
        </div>
        <div className="horizontal-panel"  style={{ position: 'relative', width: '100%', height: '100%' }}>
           <Image
            src="/images/78e9f5cb-612b-4af6-995d-ba708c1bd022.JPG"
            alt="Description of remote image"
            fill
          />


        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;
