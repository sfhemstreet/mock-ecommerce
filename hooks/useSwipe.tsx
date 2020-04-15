import { useEffect, useState, useRef } from "react";

const MIN_X_DISTANCE = 25;
const MAX_Y_DISTANCE = 20;

/**
 * Detect Left and Right Swipe Events
 * @param {Object} ref - React ref object
 * @param {function} onSwipeLeft - function
 * @param {function} onSwipeRight - function
 */
export default function useSwipe(
  ref: React.RefObject<HTMLDivElement>,
  onSwipeLeft: () => void,
  onSwipeRight: () => void
) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;

    const handleTouchStart = (event: TouchEvent) => {
      const x = event.changedTouches[0].pageX;
      const y = event.changedTouches[0].pageY;
      setCoords({ x, y });
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const x = event.changedTouches[0].pageX;
      const y = event.changedTouches[0].pageY;

      // if the touch end is less than start and the touches y is in range swipe right
      if (
        x < coords.x - MIN_X_DISTANCE &&
        y < coords.y + MAX_Y_DISTANCE &&
        y > coords.y - MAX_Y_DISTANCE
      ) {
        onSwipeRight();
      }

      // if the touch end is greater than start and the touches y is in range swipe left
      if (
        x > coords.x + MIN_X_DISTANCE &&
        y < coords.y + MAX_Y_DISTANCE &&
        y > coords.y - MAX_Y_DISTANCE
      ) {
        onSwipeLeft();
      }
    };

    if (element) {
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchend", handleTouchEnd);
      }
    };
  });
}
