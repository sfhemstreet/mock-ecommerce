import styled from "styled-components";
import { accessibleEnterKeyPress } from "../util/accessibleEnterKeyPress";
import { SiteLogo } from "../queries/types";

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
    <MyLogoContainer>
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
