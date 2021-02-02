import React, {useState, useEffect} from 'react';

export default function useOnScreen(ref:React.MutableRefObject<any>, rootMargin:string = '0px') {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState<boolean>(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Update our state when observer callback fires
          setIntersecting(entry.isIntersecting);
        },
        {
          rootMargin
        }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.disconnect();
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
    return isIntersecting;
  }