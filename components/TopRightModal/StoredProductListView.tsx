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
import {
  KeyType as StoredType,
  WISHLIST,
  updateModalsState,
  SHOPPING_CART
} from "../../storage/storage";
import {
  startEditWishListModal,
  startEditShoppingCartModal,
  stopEditWishListModal,
  stopEditShoppingCartModal
} from "../../storage/modals/modalActions";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SubmitButton } from "./SubmitButton";

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

const ProductScrollArea = styled.div<{ width: string; height: string }>`
  width: 100%;
  height: ${props => props.height};

  overflow-y: scroll;
  overflow-x: hidden;

  @media ${mediaDevices.tablet} {
    width: 400px;
    max-height: 400px;
    height: 400px;
  }
`;

type StoredProductListViewProps = {
  type: StoredType;
  list: StoredProductList | undefined;
  submitButtonText: string;
  onEdit: (item: StoredProduct) => void;
  onRemove: (item: StoredProduct) => void;
};

/**
 * Displays list of StoredProducts and options for editting or removing them
 *
 * @param type
 * @param list
 * @param submitButtonText
 * @param onEdit
 * @param onRemove
 */
export const StoredProductListView = ({
  type,
  list,
  submitButtonText,
  onEdit,
  onRemove
}: StoredProductListViewProps): JSX.Element => {
  // Store a local copy of the list for animating items on screen
  const [items, setItems] = useState({ ...list });

  // isEditting controlls switching of displays, between list and edit screen
  const [isEditting, setIsEditting] = useState(false);
  const [editItem, setEditItem] = useState<StoredProduct | null>(null);

  // Saves selcted item for editting, use timeAdded as ID for items
  const [selectedItemId, setSelectedItemId] = useState(-1);

  // Screen width to calculate width and height of containers on mobile screens
  const [width, height] = useWindowDimensions();

  const handleStartEdit = (item: StoredProduct) => {
    if (type === WISHLIST) updateModalsState(mutate, startEditWishListModal());
    else if (type === SHOPPING_CART)
      updateModalsState(mutate, startEditShoppingCartModal());

    setIsEditting(true);
    setEditItem(item);
  };

  const handleCancelEditting = () => {
    if (type === WISHLIST) updateModalsState(mutate, stopEditWishListModal());
    else if (type === SHOPPING_CART)
      updateModalsState(mutate, stopEditShoppingCartModal());

    setIsEditting(false);
    setEditItem(null);
    setItems({ ...list });
  };

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

  // Whenever list prop changes we want to wait a tiny bit for the animations,
  // then update our local copy of the list.
  useEffect(() => {
    setTimeout(() => {
      setItems({ ...list });
    }, 50);
  }, [list]);

  if (!list) return <SpinningLoader reverse />;

  return (
    <StoredProductListContainer>
      {/* Fades between Edit screen and List of products screen */}
      <SwitchTransition mode={"out-in"}>
        <Transition key={isEditting ? "Edit" : "ShowItems"} timeout={300}>
          {state => (
            <TransitionContainer state={state}>
              {isEditting ? (
                <EditStoredProduct
                  onEdit={onEdit}
                  item={editItem}
                  onCancel={handleCancelEditting}
                  width={width}
                  height={height}
                />
              ) : (
                <>
                  {/* Dimensions are for fitting it nicely on a mobile screen */}
                  <ProductScrollArea
                    width={`${width - 4}px`}
                    height={`${height - 245}px`}
                  >
                    {items.products.map(item => (
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
                    ))}
                  </ProductScrollArea>

                  <Transition
                    in={!isEditting && items.products.length > 0}
                    timeout={{
                      enter: 10,
                      exit: 300
                    }}
                    mountOnEnter
                    unmountOnExit
                  >
                    {state => (
                      <>
                        {/* Mobile Submit Button */}
                        <DisplayAtMedia mobile>
                          <Positioned
                            absolute
                            top={`${height - 230}px`}
                            style={{
                              left: state === ENTERED ? `${(width - 300) / 2}px` : "510px",
                              transition: "all 0.3s linear"
                            }}
                          >
                            <SubmitButton isSubmit>
                              {submitButtonText}
                            </SubmitButton>
                          </Positioned>
                        </DisplayAtMedia>

                        {/* Submit Button */}
                        <DisplayAtMedia tablet laptop desktop>
                          <Positioned
                            relative
                            bottom={`-8px`}
                            style={{
                              left: state === ENTERED ? `${90 / 2}px` : "400px",
                              transition: "all 0.3s linear"
                            }}
                          >
                            <SubmitButton isSubmit>
                              {submitButtonText}
                            </SubmitButton>
                          </Positioned>
                        </DisplayAtMedia>
                      </>
                    )}
                  </Transition>
                </>
              )}
            </TransitionContainer>
          )}
        </Transition>
      </SwitchTransition>
    </StoredProductListContainer>
  );
};
