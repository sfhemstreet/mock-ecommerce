import styled from "styled-components";

export enum mediaSizes {
  mobileS = '320px',
  mobileM = '375px',
  mobileL = '425px',
  tablet = '768px',
  laptop = '1000px',
  laptopL = '1440px',
  desktop = '2560px',
}

export const mediaDevices = {
  mobileS: `(min-width: ${mediaSizes.mobileS})`,
  mobileM: `(min-width: ${mediaSizes.mobileM})`,
  mobileL: `(min-width: ${mediaSizes.mobileL})`,
  tablet: `(min-width: ${mediaSizes.tablet})`,
  laptop: `(min-width: ${mediaSizes.laptop})`,
  laptopL: `(min-width: ${mediaSizes.laptopL})`,
  desktop: `(min-width: ${mediaSizes.desktop})`,
}

type DisplayAtMediaProps = {
  mobile?: boolean; 
  tablet?: boolean;
  laptop?: boolean;
  desktop?: boolean;
};

/**
 * Displays children only at specified screen sizes (width).
 * You can specify multiple sizes.
 * 
 * @param {boolean} mobile Displays children on mobile screen sizes
 * @param {boolean} tablet Displays children on tablet screen sizes
 * @param {boolean} laptop Displays children on laptop screen sizes
 * @param {boolean} desktop Displays children on desktop screen sizes
 */
export const DisplayAtMedia = styled.div<DisplayAtMediaProps>`
  display: none;

  @media ${mediaDevices.mobileS} {
    display: ${props => {
      if (props.mobile)
        return 'initial';

      return 'none';
    }}
  }

  @media ${mediaDevices.mobileM} {
    display: ${props => {
      if (props.mobile)
        return 'initial';

      return 'none';
    }}
  }

  @media ${mediaDevices.mobileL} {
    display: ${props => {
      if (props.mobile)
        return 'initial';

      return 'none';
    }}
  }

  @media ${mediaDevices.tablet} {
    display: ${props => {
      if (props.tablet)
        return 'initial';

      return 'none';
    }}
  }

  @media ${mediaDevices.laptop} {
    display: ${props => {
      if (props.laptop)
        return 'initial';

      return 'none';
    }}
  }

  @media ${mediaDevices.laptopL} {
    display: ${props => {
      if (props.laptop)
        return 'initial';

      return 'none';
    }}
  }

  @media ${mediaDevices.desktop} {
    display: ${props => {
      if (props.desktop)
        return 'initial';

      return 'none';
    }}
  }
`;
