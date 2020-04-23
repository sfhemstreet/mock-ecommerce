import styled from "styled-components";
import { StoredProduct } from "../../storage/types";
import { KeyType as StoredProductType } from "../../storage/storage";
import { Contained } from "../Contained";
import { SpinningLoader } from "../SpinningLoader";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { EditIcon } from "../EditIcon";
import { RemoveIcon } from "../RemoveIcon";
import { mediaDevices } from "../DisplayAtMedia";
import { SelectBox } from "./components/SelectBox";
import Link from "next/link";

const StoredProductIMG = styled.img`
  height: auto;
  width: 100px;
`;

const GridContainer = styled.div<{ showSelect: boolean }>`
  display: grid;
  grid-template-columns: ${props => (props.showSelect ? "35px" : "0px")} 100px 1fr 0.5fr 40px;
  grid-template-rows: 1fr;
  gap: 3px 3px;
  grid-template-areas: "select image name qualities edit";

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

type StoredProductViewProps = {
  type: StoredProductType;
  item: StoredProduct | undefined;
  onEdit: (item: StoredProduct) => void;
  onRemove: (item: StoredProduct) => void;
  onSelect: (item: StoredProduct) => void;
  isSelected: boolean;
};

/**
 * Displays a single StoredProduct, for use in StoredProductListView
 *
 * @param type
 * @param item
 * @param onRemove
 * @param onEdit
 * @param onSelect
 */
export const StoredProductView = ({
  type,
  item,
  onEdit,
  onRemove,
  onSelect,
  isSelected
}: StoredProductViewProps): JSX.Element => {
  if (!item) return <SpinningLoader />;

  const handleEdit = () => {
    onEdit(item);
  };

  const handleRemove = (evt: React.MouseEvent) => {
    onRemove(item);
  };

  const handleSelect = () => {
    onSelect(item);
  };

  const calculateedPrice = (
    item.Price * item.Quantity -
    item.Discount * item.Quantity
  ).toFixed(2);

  return (
    <GridContainer showSelect={type === "WISHLIST"}>
      {type === "WISHLIST" && (
        <GridItem gridName={"select"}>
          <Column justifyCenter>
            <SelectBox isSelected={isSelected} onClick={handleSelect} />
          </Column>
        </GridItem>
      )}
      <GridItem gridName={"image"}>
        <StoredProductIMG
          src={process.env.BACKEND_URL + item.Preview.url}
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
