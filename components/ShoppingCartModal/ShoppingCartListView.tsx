import styled from "styled-components";
import { mutate } from "swr";
import { SpinningLoader } from "../SpinningLoader";
import { useState, useEffect } from "react";
import { Padded } from "../Padded";
import { Transformed } from "../Transformed";

import { Transition, SwitchTransition } from "react-transition-group";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";
import { updateModalsState } from "../../storage/storage";
import {
  startEditShoppingCartModal,
  stopEditShoppingCartModal,
  closeShoppingCartModal
} from "../../storage/modals/modalActions";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SubmitButton } from "./components/SubmitButton";
import {
  ShoppingCart,
  ShoppingCartProduct
} from "../../storage/shoppingCart/shoppingCartTypes";
import { ShoppingCartProductView } from "./ShoppingCartProductView";
import { EditShoppingCartProduct } from "./EditShoppingCartProduct";
import { useRouter } from "next/router";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";

const TransitionContainer = styled.div<{ state: TransitionStatus }>`
  opacity: ${props => (props.state === ENTERED ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`;

const ShoppingCartListContainer = styled.div`
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

type ShoppingCartListViewProps = {
  list: ShoppingCart | undefined;
  onEdit: (item: ShoppingCartProduct) => void;
  onRemove: (item: ShoppingCartProduct) => void;
};

/**
 * Displays list of StoredProducts and options for editting or removing them
 *
 * @param list
 * @param onEdit
 * @param onRemove
 */
export const ShoppingCartListView = ({
  list,
  onEdit,
  onRemove
}: ShoppingCartListViewProps): JSX.Element => {
  const router = useRouter();

  // Store a local copy of the list for animating items on screen.
  const [items, setItems] = useState({ ...list });

  // editItem stores item user wants to edit and is used to
  // control switching between list and edit screen.
  const [editItem, setEditItem] = useState<ShoppingCartProduct | null>(null);

  // Remove item id, used to animate removal of item from list,
  // use timeAdded as ID for items.
  const [removeItemId, setRemoveItemId] = useState(-1);

  // Screen width to calculate width and height of containers on mobile screens
  const [width, height] = useWindowDimensions();

  // Handle Start Edit
  const handleStartEdit = (item: ShoppingCartProduct) => {
    updateModalsState(mutate, startEditShoppingCartModal());
    setEditItem(item);
  };

  // Handle Cancel Edit
  const handleCancelEditting = () => {
    updateModalsState(mutate, stopEditShoppingCartModal());
    setEditItem(null);
    setItems({ ...list });
  };

  // Handle Removal of Item
  const handleRemove = (item: ShoppingCartProduct) => {
    // Animate item out of list
    setRemoveItemId(item.timeAdded);

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

  const handleCheckOut = () => {
    if (items.products.length > 0) {
      router.push(`/checkout`);
      updateModalsState(mutate, closeShoppingCartModal())
    }
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
    <ShoppingCartListContainer>
      {/* Fades between Edit screen and List of products screen */}
      <SwitchTransition mode={"out-in"}>
        <Transition
          key={editItem !== null ? "Edit" : "ShowItems"}
          timeout={300}
        >
          {state => (
            <TransitionContainer state={state}>
              {editItem !== null ? (
                <EditShoppingCartProduct
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
                        isTransformed={item.timeAdded === removeItemId}
                        transform={"translateX(420px)"}
                        transition={"all 0.3s linear"}
                      >
                        <Padded padding={"1px 0px"}>
                          <ShoppingCartProductView
                            item={item}
                            onEdit={handleStartEdit}
                            onRemove={handleRemove}
                          />
                        </Padded>
                      </Transformed>
                    ))}
                  </ProductScrollArea>

                  <Transition
                    in={items.products.length > 0 && editItem === null}
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
                              left:
                                state === ENTERED
                                  ? `${(width - 300) / 2}px`
                                  : "510px",
                              transition: "all 0.3s linear"
                            }}
                          >
                            <SubmitButton
                              isSubmit
                              onClick={handleCheckOut}
                              onKeyPress={accessibleEnterKeyPress(
                                handleCheckOut
                              )}
                              aria-label={`Checkout with the following items, ${items.products
                                .map(
                                  p =>
                                    `${p.Name} by ${p.Brand.Name}, in size ${p.Size}, in color ${p.Color}, in quantity ${p.Quantity}, for ${p.Price}.`
                                )
                                .join(" ")}`}
                            >
                              Checkout
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
                            <SubmitButton
                              isSubmit
                              onClick={handleCheckOut}
                              onKeyPress={accessibleEnterKeyPress(
                                handleCheckOut
                              )}
                              aria-label={`Checkout with the following items, ${items.products
                                .map(
                                  p =>
                                    `${p.Name} by ${p.Brand.Name}, in size ${p.Size}, in color ${p.Color}, in quantity ${p.Quantity}, for ${p.Price}.`
                                )
                                .join(" ")}`}
                            >
                              Checkout
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
    </ShoppingCartListContainer>
  );
};
