import styled, { keyframes } from "styled-components";
import { Brand } from "../queries/types";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { useEffect, useState } from "react";

const MoveLeft = (width: string) => keyframes`
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-${width});
  }
`;

const BannerAreaContainer = styled.div`
  width: 100%;
  height: 80px;
  background: ${props => props.theme.gradients.crazyLite};
  overflow: hidden;

  :hover {
    overflow: scroll;
  }
`;

const Banner = styled.div<{ width: string; moveLeft: string }>`
  height: 100%;
  width: ${props => props.width};
  display: flex;
  justify-content: space-around;
  align-items: center;

  animation: ${props => MoveLeft(props.moveLeft)} 20s linear infinite;
  animation-play-state: running;

  :hover {
    animation-play-state: paused;
  }
`;

const BrandImg = styled.img<{ pad: string }>`
  width: 80px;
  height: auto;

  padding: ${props => props.pad};

  :hover {
    transform: scale(1.05);
  }

  :active {
    transform: scale(0.9);
  }
`;

type BrandsBannerProps = {
  brands: Brand[];
  onSelection: (brand: Brand) => void;
};

export const BrandsBanner = ({
  brands,
  onSelection
}: BrandsBannerProps): JSX.Element => {
  const displayedBrands = [...brands, ...brands];
  const widthOfImg = 80;
  const [width] = useWindowDimensions();

  const findPad = () =>
    brands.length * widthOfImg + brands.length * 80 > width
      ? 80
      : brands.length * widthOfImg + brands.length * 100 > width
      ? 100
      : brands.length * widthOfImg + brands.length * 300 > width
      ? 300
      : 500;

  const [pad, setPad] = useState(500);

  // updates pad when width changes
  useEffect(() => {
    setPad(findPad());
  }, [width]);

  return (
    <BannerAreaContainer>
      <Banner
        width={`${displayedBrands.length * widthOfImg +
          pad * displayedBrands.length}px`}
        moveLeft={`${brands.length * widthOfImg + pad * brands.length}px`}
      >
        {displayedBrands.map((brand, index) => (
          <BrandImg
            key={`brand${brand.Name}${index}`}
            pad={`0px ${pad / 2}px`}
            src={process.env.BACKEND_URL + brand.Logo.url}
            alt={`${brand.Name} logo`}
            loading="lazy"
            onClick={() => onSelection(brand)}
          />
        ))}
      </Banner>
    </BannerAreaContainer>
  );
};
