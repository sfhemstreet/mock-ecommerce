import styled from 'styled-components';
import { TransitionStatus, ENTERED, EXITED } from 'react-transition-group/Transition';
import { mediaDevices } from '../../DisplayAtMedia';


/** This slides in from right of screen and forces products to move out of the way */
export const SlideIn = styled.div<{ state: TransitionStatus }>`
  width: 173px;

  transition: all 0.3s ease-in-out;

  transform: ${props =>
    props.state === ENTERED ? "none" : "translateX(100%)"};

  ${props => props.state === EXITED && "display: none"};

  @media ${mediaDevices.mobileM} {
    padding-right: 15px;
  }
`;

/** This holds the filter and sort box in an absolute position so it does not move.
 *  We shrink the box and move it up if on a really small mobile screen.
 */
export const SlideInChild = styled.div`
  position: absolute;
  top: -70px;
  right: -10px;

  transition: all 0.3s ease-in-out;
  transform: scale(0.8);

  @media ${mediaDevices.mobileM} {
    transform: none;
    top: 0px;
    right: 10px;
  }
`;