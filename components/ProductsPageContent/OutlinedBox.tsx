import styled from 'styled-components';

export const OutlinedBox = styled.div`
  width: 170px;
  height: auto;
  border: solid 1px ${props => props.theme.colors.transparentWhite};
  display: flex;
  flex-direction: column;
  padding: 5px;
`;