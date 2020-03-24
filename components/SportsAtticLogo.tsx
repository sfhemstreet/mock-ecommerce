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

const MyLogoContainerSmall = styled(MyLogoContainer)`
  width: 31px;
`;

export const SportsAtticLogo = (): JSX.Element => {
  return (
    <MyLogoContainer>
      <MyLogo src="/images/sportattic_logo_green.png" alt="Sports Attic Logo" />
    </MyLogoContainer>
  );
}

export const SportsAtticLogoSmall = (): JSX.Element => {
  return (
    <MyLogoContainerSmall>
      <MyLogo src="/images/sportattic_logo_green_small.png" alt="Sports Attic Logo Small" />
    </MyLogoContainerSmall>
  );
}