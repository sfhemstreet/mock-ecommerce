import styled from "styled-components";
import { mutate } from "swr";
import { StoredProductList, StoredProduct } from "../../storage/types";
import { SpinningLoader } from "../SpinningLoader";
import { useState, useEffect } from "react";
import { Padded } from "../Padded";
import { Transformed } from "../Transformed";
import { EditStoredProduct } from "./EditStoredProduct";
import { Transition, SwitchTransition } from "react-transition-group";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";
import { StoredProductView } from "./StoredProductView";
import { KeyType as StoredType, WISHLIST, updateModalsState, SHOPPING_CART } from '../../storage/storage';
import { startEditWishListModal, startEditShoppingCartModal, stopEditWishListModal, stopEditShoppingCartModal } from "../../storage/modals/modalActions";

const TransitionContainer = styled.div<{ state: TransitionStatus }>`
  opacity: ${props => (props.state === ENTERED ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`;

const StoredProductListContainer = styled.div`
  width: 98%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;

  margin: 5px;
`;

type StoredProductListViewProps = {
  type: StoredType;
  list: StoredProductList | undefined;
  onEdit: (item: StoredProduct) => void;
  onRemove: (item: StoredProduct) => void;
};

export const StoredProductListView = ({
  type,
  list,
  onEdit,
  onRemove
}: StoredProductListViewProps): JSX.Element => {

  // store local copy for animating items
  const [items, setItems] = useState({ ...list });

  // isEditting controlls switching of displays
  const [isEditting, setIsEditting] = useState(false);
  const [editItem, setEditItem] = useState<StoredProduct | null>(null);

  // use timeAdded as ID for items
  const [selectedItemId, setSelectedItemId] = useState(-1);

  const handleStartEdit = (item: StoredProduct) => {
    if (type === WISHLIST)
      updateModalsState(mutate, startEditWishListModal());  
    else if (type === SHOPPING_CART)
      updateModalsState(mutate, startEditShoppingCartModal());

    setIsEditting(true);
    setEditItem(item);
  };

  const handleCancelEditting = () => {
    if (type === WISHLIST)
      updateModalsState(mutate, stopEditWishListModal());  
    else if (type === SHOPPING_CART)
      updateModalsState(mutate, stopEditShoppingCartModal());

    setIsEditting(false);
    setEditItem(null);
    setItems({...list});
  }

  const handleRemove = (item: StoredProduct) => {
    setSelectedItemId(item.timeAdded);

    // Let animation finish before removing local version of item
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

    // After local version is removed, excute onRemove
    setTimeout(() => {
      onRemove(item);
    }, 500);
  };

  useEffect(() => {
    setTimeout(() => {
      setItems({...list})
    }, 50)
  }, [list])

  if (!list) return <SpinningLoader reverse />;

  return (
    <StoredProductListContainer>
      <SwitchTransition mode={"out-in"}>
        <Transition key={isEditting ? "Edit" : "ShowItems"} timeout={300}>
          {state => (
            <TransitionContainer state={state}>
              {isEditting ? (
                <EditStoredProduct
                  onEdit={onEdit}
                  item={editItem}
                  onCancel={handleCancelEditting}
                />
              ) : (
                items.products.map(item => (
                  <Transformed
                    key={`${item.id}${item.timeAdded}`}
                    isTransformed={item.timeAdded === selectedItemId}
                    transform={"translateX(420px)"}
                    transition={"all 0.3s linear"}
                  >
                    <Padded padding={"1px 0px"}>
                      <StoredProductView
                        item={item}
                        onEdit={handleStartEdit}
                        onRemove={handleRemove}
                      />
                    </Padded>
                  </Transformed>
                ))
              )}
            </TransitionContainer>
          )}
        </Transition>
      </SwitchTransition>
    </StoredProductListContainer>
  );
};
