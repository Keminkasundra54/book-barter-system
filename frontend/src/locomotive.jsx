import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css'; // Import LocomotiveScroll CSS

const SmoothScroll = () => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true, 
    });

    return () => scroll.destroy(); // Cleanup on unmount
  }, []);

  return null;
};

export default SmoothScroll;