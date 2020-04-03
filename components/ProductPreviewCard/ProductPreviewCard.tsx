import styled from "styled-components";
import { ProductPreview } from "../../queries/getProducts";
import { Contained } from "../Contained";
import { mediaDevices } from "../DisplayAtMedia";
import { Txt } from "../Txt";
import { Row } from "../Row";

type ProductPreviewCardProps = {
  productInfo: ProductPreview;
};

const ProductCardThumbnailImg = styled.img`
  width: 150px;
  height: auto;

  @media ${mediaDevices.mobileM} {
    width: 160px;
  }

  @media ${mediaDevices.mobileL} {
    width: 200px;
  }

  @media ${mediaDevices.tablet} {
    width: 250px;
  }

  @media ${mediaDevices.laptop} {
    width: 300px;
  }
`;

const ProductPreviewCardContainer = styled.div`
  width: 150px;
  height: auto;

  @media ${mediaDevices.mobileM} {
    width: 160px;
  }

  @media ${mediaDevices.mobileL} {
    width: 200px;
  }

  @media ${mediaDevices.tablet} {
    width: 250px;
  }

  @media ${mediaDevices.laptop} {
    width: 300px;
  }
`;

export const ProductPreviewCard = ({
  productInfo
}: ProductPreviewCardProps): JSX.Element => {
  return (
    <ProductPreviewCardContainer>
      <ProductCardThumbnailImg
        src={process.env.BACKEND_URL + productInfo.Preview.url}
      />
      <Row justifyBetween>
        <Txt alignCenter>{productInfo.Name}</Txt>
        <Txt alignCenter>${productInfo.Price}</Txt>
      </Row>
    </ProductPreviewCardContainer>
  );
};
