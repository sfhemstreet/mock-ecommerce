import { useState, useEffect } from "react";

/**
 * @returns [number, number] width and height of window
 */
function getWindowDimensions() {
  if (typeof window !== 'undefined' && window) {
    const { innerWidth: width, innerHeight: height } = window;
    return [width, height];  
  }
  // just return average mobile screen size
  return [370, 800];
}

/**
 * - get width and height of window
 * - adjusts to window resizing
 * @returns [number, number] width and height of window
 */
export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (typeof window !== 'undefined' && window) 
      window.addEventListener("resize", handleResize);
      
    return () => {
      if (typeof window !== 'undefined' && window) 
        window.removeEventListener("resize", handleResize)
    }
  }, []);

  return windowDimensions;
}
