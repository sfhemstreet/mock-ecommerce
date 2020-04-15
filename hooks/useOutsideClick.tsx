import { RefObject, useEffect } from "react";

export function useOutsideClick(ref: RefObject<HTMLDivElement>, onOutsideClick: any ) {
  function handleOutsideClick(evt: globalThis.MouseEvent) {
    if (ref.current && evt.composedPath().includes(ref.current)){
      //console.log("inside click");
      return
    }
    //console.log("outside click")
    onOutsideClick();
  }

  function handleOutsideEnterKeyPress(evt: KeyboardEvent) {
    if (evt.key === 'Enter' && ref.current && evt.composedPath().includes(ref.current)){
      //console.log("inside click");
      return
    }
    //console.log("outside click")
    onOutsideClick();
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);
    document.addEventListener('keypress', handleOutsideEnterKeyPress, false);
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
      document.removeEventListener('keypress', handleOutsideEnterKeyPress, false);
    }
  }, [] );
}