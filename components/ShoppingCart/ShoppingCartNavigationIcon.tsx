import styled, { css } from "styled-components";
import useSWR, { mutate } from "swr";
import { FadeIn } from "../../keyframes/FadeIn";
import { ScaleSmallToBig } from "../../keyframes/ScaleSmallToBig";
import { ShakeNWait } from "../../keyframes/ShakeNWait";
import {
  SHOPPING_CART,
  getShoppingCart,
  getModalsState,
  MODAL,
  updateModalsState,
  updateShoppingCart
} from "../../storage/storage";
import { SpinningLoader } from "../SpinningLoader";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import Transition from "react-transition-group/Transition";
import {
  closeShoppingCartModal,
  toggleShoppingCartModal
} from "../../storage/modals/modalActions";
import { TopRightModal } from "../TopRightModal/TopRightModal";
import { TopRightModalSkeleton } from "../TopRightModal/TopRightModalSkeleton";
import { StoredProductListView } from "../TopRightModal/StoredProductListView";
import { StoredProduct } from "../../storage/types";
import { removeItemFromShoppingCart } from "../../storage/shoppingCart/shoppingCartActions";

const ShakeAnimationMixin = css `
  animation: ${ShakeNWait} 15s linear infinite;
  animation-delay: 3s;
`;

const ShoppingCartIconContainer = styled.div<{ willShake: boolean }>`
  position: relative;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.willShake && ShakeAnimationMixin};
`;

const ShoppingCartSVG = styled.svg`
  fill: ${props => props.theme.colors.white};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;

  ${ShoppingCartIconContainer}:hover & {
    fill: ${props => props.theme.colors.rose};
  }
`;

const ShoppingCartCircle = styled.div`
  position: absolute;
  top: -15px;
  left: 10px;

  background-color: ${props => props.theme.colors.green};

  width: 23px;
  height: 23px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${FadeIn} 0.3s ease-in-out;

  cursor: pointer;

  transition: background-color 0.3s linear;

  ${ShoppingCartIconContainer}:hover & {
    background-color: ${props => props.theme.colors.rose};
  }
`;

const ShoppingCartNumber = styled.p`
  font-size: 13px;
  font-family: ${props => props.theme.typography.fontFamily};
  color: ${props => props.theme.colors.white};
  margin: 0;
  padding: 0;

  animation: ${FadeIn} 0.4s ease-out;

  transition: color 0.3s linear;

  ${ShoppingCartIconContainer}:hover & {
    color: ${props => props.theme.colors.black};
  }
`;

const AddToCartRipple = styled.div<{ delay: string }>`
  position: absolute;
  top: -15px;
  left: 10px;

  width: 23px;
  height: 23px;

  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;

  opacity: 0;

  cursor: pointer;

  animation: ${ScaleSmallToBig} 1s linear;
  animation-delay: ${props => props.delay};
`;

/**
 * Displays a Material Icons shopping cart icon with a
 * little green bubble showing the number of items in the cart (if there are items).
 * Every time numberOfItems changes a ripple effect happens around the green bubble.
 *
 */
export const ShoppingCartNavigationIcon = (): JSX.Element => {
  const shoppingCart = useSWR(SHOPPING_CART, getShoppingCart);
  const open = useSWR(MODAL, getModalsState);

  const handleCloseModal = () => {
    if (open.data)
      updateModalsState(mutate, closeShoppingCartModal(), open.data);
  };

  const handleClickIcon = () => {
    updateModalsState(mutate, toggleShoppingCartModal());
  };

  if (!shoppingCart.data || !open.data) return <SpinningLoader />;

  const handleItemEdit = (item: StoredProduct) => {};

  const handleItemRemoval = (item: StoredProduct) => {
    updateShoppingCart(mutate, removeItemFromShoppingCart(item.id, item.timeAdded));
  };

  return (
    <>
      <ShoppingCartIconContainer
        tabIndex={0}
        willShake={shoppingCart.data.products.length > 0}
        onClick={handleClickIcon}
        onKeyPress={accessibleEnterKeyPress(handleClickIcon)}
      >
        <ShoppingCartSVG
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </ShoppingCartSVG>
        {shoppingCart.data.products.length > 0 && (
          <>
            <div
              key={`ShoppingCartRipples${shoppingCart.data.products.length}`}
            >
              {[0, 0.2, 0.5, 0.7].map(sec => (
                <AddToCartRipple key={`ripple${sec}`} delay={`${sec}s`} />
              ))}
            </div>
            <ShoppingCartCircle>
              <ShoppingCartNumber
                key={`ShoppingCartNumber${shoppingCart.data.products.length}`}
              >
                {shoppingCart.data.products.length}
              </ShoppingCartNumber>
            </ShoppingCartCircle>
          </>
        )}
      </ShoppingCartIconContainer>
      <Transition
        in={open.data.shoppingCart.isOpen}
        timeout={{
          enter: 50,
          exit: 400
        }}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <TopRightModal onClose={handleCloseModal} state={state}>
            <TopRightModalSkeleton
              title={"Shopping Cart"}
              onClose={handleCloseModal}
            >
              <StoredProductListView
                list={shoppingCart.data}
                onEdit={(item: StoredProduct) => handleItemEdit(item)}
                onRemove={(item: StoredProduct) => handleItemRemoval(item)}
              />
            </TopRightModalSkeleton>
          </TopRightModal>
        )}
      </Transition>
    </>
  );
};
