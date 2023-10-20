import React, { useEffect, useRef } from 'react';
import { scroller } from 'react-scroll';

function Home() {
  const section1Ref = useRef(null); // Create a ref for Section 1
  const section2Ref = useRef(null); // Create a ref for Section 2
  const section3Ref = useRef(null); // Create a ref for Section 3

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const section1Top = section1Ref.current.offsetTop;
      const section2Top = section2Ref.current.offsetTop;
      const section3Top = section3Ref.current.offsetTop;

      // Set a threshold for when to trigger scrolling
      const threshold = 200;

      if (scrollPosition < section2Top - threshold) {
        scroller.scrollTo('section1', {
          duration: 1500,
          delay: 0,
          smooth: 'easeInOutQuint',
        });
      } else if (scrollPosition < section3Top - threshold) {
        scroller.scrollTo('section2', {
          duration: 1500,
          delay: 0,
          smooth: 'easeInOutQuint',
        });
      } else {
        scroller.scrollTo('section3', {
          duration: 1500,
          delay: 0,
          smooth: 'easeInOutQuint',
        });
      }
    };

    // Add a scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="gallery">
      <div className="home">
        <div ref={section1Ref} id="section1">
          Section 1 content
        </div>
        <div ref={section2Ref} id="section2">
          Section 2 content
        </div>
        <div ref={section3Ref} id="section3">
          Section 3 content
        </div>
      </div>
    </div>
  );
}

export default Home;
