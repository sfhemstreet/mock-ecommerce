import styled from 'styled-components';

type PositionedProps = {
  static?: boolean;
  relative?: boolean;
  fixed?: boolean;
  absolute?: boolean;
  sticky?: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?:string;
  zIndex?: number;
  opacity?: number;
  width?: string;
  height?: string;
}

/**
 * Positioned div
 * 
 * Specify a position param (default is relative)
 * top, bottom, left, right 
 * 
 * @param {boolean} static position: static
 * @param {boolean} relative position: relative (default)
 * @param {boolean} fixed position: fixed
 * @param {boolean} sticky position: sticky
 * @param {boolean} absolute position: absolute
 * @param {string} top Distance in px from top of positioned ancestor
 * @param {string} left Distance in px from left of positioned ancestor
 * @param {string} zIndex number z-index, if none given defaults to `auto`
 * @param {string} opacity Opacity, 0-1
 * @param {string} width width of element as string, ie "20px"
 * @param {string} height height of element as string, ie "20px"
 */
export const Positioned = styled.div<PositionedProps>`
  position: ${props => {
    if (props.static) return 'static';
    if (props.relative) return 'relative';
    if (props.fixed) return 'fixed';
    if (props.sticky) return 'sticky';
    if (props.absolute) return 'absolute';
    return 'relative';
  }};

  width: ${props => props.width ?? 'auto'};
  height: ${props => props.height ?? 'auto'};

  ${props => props.top && `top: ${props.top}` };
  ${props => props.bottom && `bottom: ${props.bottom}`};
  ${props => props.left && `left: ${props.left}`};
  ${props => props.right && `right: ${props.right}` };
  
  z-index: ${props => props.zIndex ? props.zIndex : 'auto'};
  opacity: ${props => props.opacity ? props.opacity : 1};
`;