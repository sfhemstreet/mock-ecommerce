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
`;

const Banner = styled.div<{ width: string; moveLeft: string, pause: boolean }>`
  height: 100%;
  width: ${props => props.width};
  display: flex;
  justify-content: space-around;
  align-items: center;

  animation: ${props => MoveLeft(props.moveLeft)} 20s linear infinite;
  animation-play-state: ${props => props.pause ? "paused" : "running"};
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
  const [width] = useWindowDimensions();
  const [isPaused, setIsPaused] = useState(false);
  const widthOfImg = 80;

  const displayedBrands = [...brands, ...brands];

  const pad =
    (brands.length * widthOfImg) + (brands.length * 80) > width
      ? 80
      : (brands.length * widthOfImg) + (brands.length * 100) > width
      ? 100
      : (brands.length * widthOfImg) + (brands.length * 300) > width
      ? 300
      : 500;

  console.log(pad, width - brands.length * widthOfImg);

  useEffect(() => {
   
  }, [width])

  return (
    <BannerAreaContainer>
      <Banner
        pause={isPaused}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        width={`${displayedBrands.length * widthOfImg +
          pad * displayedBrands.length}px`}
        moveLeft={`${brands.length * widthOfImg + pad * brands.length}px`}
      >
        {displayedBrands.map((brand, index) => (
          <BrandImg
            key={`brand${brand.Name}${index}`}
            pad={`0px ${pad/2}px`}
            src={process.env.BACKEND_URL + brand.Logo.url}
            alt={`${brand.Name} logo`}
          />
        ))}
      </Banner>
    </BannerAreaContainer>
  );
};
