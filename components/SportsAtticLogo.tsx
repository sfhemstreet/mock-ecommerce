import styled from 'styled-components';

const MyLogo = styled.img`
  width: 100%;
  height: auto;
`;

const MyLogoContainer = styled.div`
  width: 100px;
  height: 31px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SportsAtticLogo = (): JSX.Element => {
  return (
    <MyLogoContainer>
      <MyLogo src="/images/sportattic_logo_green.png" alt="Sports Attic Logo" />
    </MyLogoContainer>
  );
}