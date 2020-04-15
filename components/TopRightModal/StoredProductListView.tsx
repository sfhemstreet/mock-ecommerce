import styled from "styled-components";
import { StoredProductList, StoredProduct } from "../../storage/types";
import { Contained } from "../Contained";
import { SpinningLoader } from "../SpinningLoader";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { EditIcon } from "../EditIcon";
import { RemoveIcon } from "../RemoveIcon";
import { useState } from "react";
import { Padded } from "../Padded";
import { Transformed } from "../Transformed";
import { mediaDevices } from "../DisplayAtMedia";
import { EditStoredProduct } from "./EditStoredProduct";
import { Transition } from "react-transition-group";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";

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

const TransitionContainer = styled.div<{ state: TransitionStatus }>`
  opacity: ${props => (props.state === ENTERED ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const StoredProductListContainer = styled.div`
  width: 99%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;

  margin: 5px;
`;

type StoredProductListViewProps = {
  list: StoredProductList | undefined;
  onEdit: (item: StoredProduct) => void;
  onRemove: (item: StoredProduct) => void;
};

export const StoredProductListView = ({
  list,
  onEdit,
  onRemove
}: StoredProductListViewProps): JSX.Element => {
  if (!list) return <SpinningLoader reverse />;

  const [items, setItems] = useState({ ...list });
  const [isEditting, setIsEditting] = useState(false);
  const [editItem, setEditItem] = useState<StoredProduct | null>(null);
  const [selectedItemId, setSelectedItemId] = useState(-1);

  const handleEdit = (item: StoredProduct) => {
    setIsEditting(true);
    setEditItem(item);
  };

  const handleRemove = (item: StoredProduct) => {
    setSelectedItemId(item.timeAdded);

    setTimeout(() => {
      setItems({
        ...items,
        products: [
          ...items.products.filter(
            i => !(i.id === item.id && i.timeAdded === item.timeAdded)
          )
        ]
      });
    }, 310);

    setTimeout(() => {
      onRemove(item);
    }, 500);
  };

  return (
    <StoredProductListContainer>
      <Transition
        in={!isEditting}
        timeout={{
          enter: 300,
          exit: 300
        }}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <TransitionContainer state={state}>
            {items.products.map((item, index) => (
                <Transformed
                  key={`${item.id}${item.timeAdded}`}
                  isTransformed={item.timeAdded === selectedItemId}
                  transform={"translateX(420px)"}
                  transition={"all 0.3s linear"}
                >
                  <Padded padding={"1px 0px"}>
                    <StoredProductView
                      item={item}
                      onEdit={handleEdit}
                      onRemove={handleRemove}
                    />
                  </Padded>
                </Transformed>
              ))}  
          </TransitionContainer>
        )}
      </Transition>
      <Transition
        in={isEditting}
        timeout={{
          enter: 300,
          exit: 300
        }}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <TransitionContainer state={state}>
            <EditStoredProduct
              item={editItem}
              onCancel={() => setIsEditting(false)}
            />
          </TransitionContainer>
        )}
      </Transition>
    </StoredProductListContainer>
  );
};
