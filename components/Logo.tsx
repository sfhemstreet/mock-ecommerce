import styled from "styled-components";
import { SiteLogo } from "../queries/navigationBarSideDrawerLayout/getSiteLogo";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";

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

type SiteLogoProps = {
  siteLogo: SiteLogo;
};

export const Logo = ({ siteLogo }: SiteLogoProps): JSX.Element => {
  return (
    <MyLogoContainer
      tabIndex={0}
    >
      <MyLogo
        src={process.env.BACKEND_URL + siteLogo.NormalLogo.url}
        alt="Site Logo"
      />
    </MyLogoContainer>
  );
};

export const LogoSmall = ({ siteLogo }: SiteLogoProps): JSX.Element => {
  return (
    <MyLogoContainerSmall>
      <MyLogo
        src={process.env.BACKEND_URL + siteLogo.SmallLogo.url}
        alt="Site Logo Small"
      />
    </MyLogoContainerSmall>
  );
};
