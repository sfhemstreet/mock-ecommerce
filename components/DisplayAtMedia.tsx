import styled from "styled-components";

export enum mediaSizes {
  mobileS = 320,
  mobileM = 375,
  mobileL = 425,
  tablet = 768,
  laptop = 1000,
  laptopL = 1440,
  desktop = 2560,
}

export const mediaSizesString = {
  mobileS: `${mediaSizes.mobileS}px`,
  mobileM: `${mediaSizes.mobileM}px`,
  mobileL: `${mediaSizes.mobileL}px`,
  tablet: `${mediaSizes.tablet}px`,
  laptop: `${mediaSizes.laptop}px`,
  laptopL: `${mediaSizes.laptopL}px`,
  desktop: `${mediaSizes.desktop}px`,
}

export const mediaDevices = {
  mobileS: `(min-width: ${mediaSizesString.mobileS})`,
  mobileM: `(min-width: ${mediaSizesString.mobileM})`,
  mobileL: `(min-width: ${mediaSizesString.mobileL})`,
  tablet: `(min-width: ${mediaSizesString.tablet})`,
  laptop: `(min-width: ${mediaSizesString.laptop})`,
  laptopL: `(min-width: ${mediaSizesString.laptopL})`,
  desktop: `(min-width: ${mediaSizesString.desktop})`,
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
