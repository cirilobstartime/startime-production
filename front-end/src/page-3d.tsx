// pages/Gallery.js or app/gallery/page.js
'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

// Register ScrollTrigger globally once on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GalleryScrollAnimation = () => {
  useEffect(() => {
    // Only run GSAP logic on the client side
    if (typeof window !== 'undefined') {

      gsap.utils.toArray(".gallery_box_in");

      // GSAP Timeline (as originally requested)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".gallery_box",
          start: "top center-=200px",
          end: "bottom+=3000px center-=200px", // Long end distance for a slow scroll effect
          scrub: true,
          pin: true, // Pins the .gallery_box element while scrolling
          markers: true, // IMPORTANT: Remove this line for production!
        }
      });

      tl.to('.gallery_box_outer', {
        duration: 10,
        rotateY: 360, // Rotates the outer box, making the inner items spin
        ease: "none",
      });

      // Cleanup function
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <div> 
       {/* style={{ height: '500vh', position: 'relative' }}> */}

      {/* Increased height for scroll space */}



      <section className="work2">
        {/* .gallery_box is the ScrollTrigger and Pin target. Its styles are now in the CSS */}
        <div className="gallery_box">

          {/* .gallery_box_outer is the element that rotates */}
          <div className="gallery_box_outer">

            {/* Inner elements (.gallery_box_in) are positioned by the CSS :nth-child rules */}
            <div className="gallery_box_in" style={{ background: 'black' }}>
               <Image
                src="/images/291bc7b7-7abf-402f-aece-b8c1d4658e8a.JPG"
                alt="Description of remote image"
                width={500}
                height={500}
              />
            </div>
            <div className="gallery_box_in" style={{ background: 'yellow' }}></div>
            <div className="gallery_box_in" style={{ background: 'red' }}></div>
            <div className="gallery_box_in" style={{ background: 'pink' }}></div>
            <div className="gallery_box_in" style={{ background: 'blue' }}></div>
            <div className="gallery_box_in" style={{ background: 'green' }}></div>
            <div className="gallery_box_in" style={{ background: 'purple' }}></div>
            <div className="gallery_box_in" style={{ background: 'lightgrey' }}></div>
            <div className="gallery_box_in" style={{ background: 'orange' }}>
              <Image
                src="/images/0b83c0ab-7666-44ec-9c94-01a4b896cc65.JPG"
                alt="Description of remote image"
                width={500}
                height={500}
              />
            </div>

          </div>
        </div>
      </section>
      {/* 
 <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>GSAP 3D Scroll Gallery</h1>
      <section style={{ height: '50vh', textAlign: 'center', paddingTop: '100px' }}>
        <h1>Extra space just for demo, remove this</h1>
        <p>This content appears after the pinning/animation section ends.</p>
      </section> */}
    </div>
  );
};

export default GalleryScrollAnimation;