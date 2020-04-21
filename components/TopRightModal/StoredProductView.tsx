import styled from "styled-components";
import { StoredProduct } from "../../storage/types";
import { Contained } from "../Contained";
import { SpinningLoader } from "../SpinningLoader";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { EditIcon } from "../EditIcon";
import { RemoveIcon } from "../RemoveIcon";
import { mediaDevices } from "../DisplayAtMedia";

const StoredProductIMG = styled.img`
  height: 100px;
  width: auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr 0.3fr;
  grid-template-rows: 1fr;
  gap: 3px 3px;
  grid-template-areas: "image name qualities edit";

  width: 100%;
  height: 120px;

  background-color: white;
  color: ${props => props.theme.colors.black};

  @media ${mediaDevices.mobileM} {
    height: 100px;
  }
`;

const GridItem = styled.div<{ gridName: string }>`
  grid-area: ${props => props.gridName};
`;

type StoredProductViewProps = {
  item: StoredProduct | undefined;
  onEdit: (item: StoredProduct) => void;
  onRemove: (item: StoredProduct) => void;
};

/**
 * Displays a single StoredProduct, for use in StoredProductListView
 * 
 * @param item
 * @param onRemove
 * @param onEdit
 */
export const StoredProductView = ({
  item,
  onEdit,
  onRemove
}: StoredProductViewProps): JSX.Element => {
  if (!item) return <SpinningLoader />;

  const handleEdit = () => {
    onEdit(item);
  };

  const handleRemove = (evt: React.MouseEvent) => {
    onRemove(item);
  };

  const calculateedPrice =
    item.Price * item.Quantity - item.Discount * item.Quantity;

  return (
    <GridContainer>
      <GridItem gridName={"image"}>
        <StoredProductIMG
          src={process.env.BACKEND_URL + item.Preview.url}
          alt={`${item.Name}`}
        />
      </GridItem>
      <GridItem gridName={"name"}>
        <Column justifyEvenly>
          <Contained>
            <Txt small>{item.Brand.Name}</Txt>
            <Txt bold>{item.Name}</Txt>
          </Contained>
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
          <Txt>Quantity: {item.Quantity}</Txt>
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