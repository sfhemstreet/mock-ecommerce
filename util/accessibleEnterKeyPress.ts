import { KeyboardEvent } from 'react';
/**
 * Makes elements accessible by peforming the onClick function when a user hits 'Enter'. Use with onKeyPress
 * 
 * ie onKeyPress( accessibleEnterKeyPress(onClickFunction) )
 * @param {(() => void) | undefined} onClick 
 * Function that should be called when enter key is processed (usually the same function as onClick events)
*/
export const accessibleEnterKeyPress = (onClick: ((clickedThing?: any) => void) | undefined) => ({ key }: KeyboardEvent) => {
  if (key === 'Enter' && onClick) {
    onClick();
  }
}           