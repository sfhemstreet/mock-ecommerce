import styled from "styled-components";
import { Contained } from "../Contained";
import { SpinningLoader } from "../SpinningLoader";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { EditIcon } from "../EditIcon";
import { RemoveIcon } from "../RemoveIcon";
import { mediaDevices } from "../DisplayAtMedia";
import Link from "next/link";
import { ShoppingCartProduct } from "../../storage/shoppingCart/shoppingCartTypes";

const ProductIMG = styled.img`
  height: auto;
  width: 100px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 0.5fr 40px;
  grid-template-rows: 1fr;
  gap: 3px 3px;
  grid-template-areas: "image name qualities edit";

  width: 100%;
  min-height: 100px;

  background-color: white;
  color: ${props => props.theme.colors.black};

  @media ${mediaDevices.mobileM} {
    min-height: 100px;
  }
`;

const GridItem = styled.div<{ gridName: string }>`
  grid-area: ${props => props.gridName};
`;

const LinkContainer = styled.a`
  text-decoration: none;
  display: block;
  cursor: pointer;

  transition: color 0.3s ease-in;

  :hover {
    color: ${props => props.theme.colors.green};
  }
`;

type ShoppingCartProductViewProps = {
  item: ShoppingCartProduct | undefined;
  onEdit: (item: ShoppingCartProduct) => void;
  onRemove: (item: ShoppingCartProduct) => void;
};

/**
 * Displays a single StoredProduct, for use in StoredProductListView
 *
 * @param item
 * @param onRemove
 * @param onEdit
 */
export const ShoppingCartProductView = ({
  item,
  onEdit,
  onRemove,
}: ShoppingCartProductViewProps): JSX.Element => {
  if (!item) return <SpinningLoader />;

  const handleEdit = () => {
    onEdit(item);
  };

  const handleRemove = (evt: React.MouseEvent) => {
    onRemove(item);
  };

  const calculateedPrice = (
    item.Price * item.Quantity -
    item.Discount * item.Quantity
  ).toFixed(2);

  return (
    <GridContainer>
      <GridItem gridName={"image"}>
        <ProductIMG
          src={process.env.BACKEND_URL + item.Preview.url}
          loading="lazy"
          alt={`${item.Name}`}
        />
      </GridItem>
      <GridItem gridName={"name"}>
        <Column justifyEvenly>
          <Link href={`/product/${item.slug}`}>
            <LinkContainer>
              <Txt small>{item.Brand.Name}</Txt>
              <Txt bold>{item.Name}</Txt>
            </LinkContainer>
          </Link>
          <Txt big bold>
            {`$${calculateedPrice}`}
          </Txt>
        </Column>
      </GridItem>
      <GridItem gridName={"qualities"}>
        <Column justifyEvenly>
          <Contained>
            <Txt>{item.Color}</Txt>
            <Txt>Size: {item.Size}</Txt>
          </Contained>
          <Txt>Qty: {item.Quantity}</Txt>
        </Column>
      </GridItem>
      <GridItem gridName={"edit"}>
        <Column justifyEvenly>
          <EditIcon onClick={handleEdit} />
          <RemoveIcon onClick={handleRemove} />
        </Column>
      </GridItem>
    </GridContainer>
  );
};
