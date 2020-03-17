import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: auto;
`;

export const BackgroundBlack = styled(Background)`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.black};
`;

export const BackgroundBlackGradient = styled(Background)`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.gradients.blackToWhite};
`;

export const BackgroundYellowGradient = styled(Background)`
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.gradients.blackToYellow};
`;

export const BackgroundGreen = styled(Background)`
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.green};
`;

export const BackgroundYellow = styled(Background)`
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.yellow};
`;

export const BackgroundRose = styled(Background)`
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.rose};
`;

export const BackgroundWhite = styled(Background)`
  color: ${props => props.theme.colors.black};
  background: ${props => props.theme.colors.white};
`;