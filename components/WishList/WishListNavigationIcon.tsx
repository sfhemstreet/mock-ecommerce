import useSWR, { mutate } from "swr";
import styled, { css } from "styled-components";
import { UpDownWait } from "../../keyframes/UpDownWait";
import {
  WISHLIST,
  getWishlist,
  getModalsState,
  MODAL,
  updateModalsState,
  updateWishList
} from "../../storage/storage";
import { SpinningLoader } from "../SpinningLoader";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { Transition } from "react-transition-group";
import {
  closeWishListModal,
  toggleWishListModal
} from "../../storage/modals/modalActions";

import { removeItemFromWishlist } from "../../storage/wishlist/wishListActions";
import { Modal } from "../ShoppingCartWishListModal/Modal";
import { ModalSkeleton } from "../ShoppingCartWishListModal/ModalSkeleton";
import { WishListProduct } from "../../storage/wishlist/wishListTypes";
import { WishListProductList } from "./WishListProductList";

const WishListIconContainer = styled.div<{ willShake: boolean }>`
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.willShake && ShakeAnimationMixin};
`;

type WishListSVGProps = {
  isFilled: boolean;
};

const WishListSVG = styled.svg<WishListSVGProps>`
  fill: ${props =>
    props.isFilled ? props.theme.colors.rose : props.theme.colors.white};
  position: relative;
  cursor: pointer;

  transition: fill 0.3s linear;

  :hover {
    fill: ${props =>
      props.isFilled ? props.theme.colors.white : props.theme.colors.rose};
  }

  ${WishListIconContainer}:focus & {
    fill: ${props =>
      props.isFilled ? props.theme.colors.white : props.theme.colors.rose};
  }
`;

const ShakeAnimationMixin = css `
  animation: ${UpDownWait} 15s linear infinite;
  animation-delay: 3s;
`;





/**
 * Displays a Material Icons heart icon that is filled in if items are in WishList
 *
 */
export const WishListNavigationIcon = (): JSX.Element => {
  const wishList = useSWR(WISHLIST, getWishlist);
  const open = useSWR(MODAL, getModalsState);

  const handleCloseModal = () => {
    if (open.data) updateModalsState(mutate, closeWishListModal(), open.data);
  };

  const handleClickIcon = () => {
    updateModalsState(mutate, toggleWishListModal());
  };

  const handleItemRemoval = (item: WishListProduct) => {
    updateWishList(mutate, removeItemFromWishlist(item.id));
  };

  if (!wishList.data || !open.data) return <SpinningLoader reverse />;

  return (
    <>
      <WishListIconContainer
        tabIndex={0}
        role="button"
        aria-label={
          !open.data
            ? "Wishlist"
            : open.data.wishlist.isOpen
            ? "Close Wishlist"
            : "Open Wishlist"
        }
        willShake={wishList.data.products.length > 0}
        onClick={handleClickIcon}
        onKeyPress={accessibleEnterKeyPress(handleClickIcon)}
      >
        <WishListSVG
          isFilled={wishList.data.products.length > 0}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d={"M0 0h24v24H0V0z"} fill="none" />
          {wishList.data.products.length > 0 ? (
            <path
              d={
                "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              }
            />
          ) : (
            <path
              d={
                "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
              }
            />
          )}
        </WishListSVG>
      </WishListIconContainer>
      {/* WishList Modal*/}
      <Transition
        in={open.data.wishlist.isOpen}
        timeout={{
          enter: 50,
          exit: 400
        }}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <Modal onClose={handleCloseModal} state={state}>
            <ModalSkeleton
              title={"WishList"}
              onClose={handleCloseModal}
            >
              <WishListProductList products={wishList.data?.products} />
            </ModalSkeleton>
          </Modal>
        )}
      </Transition>
    </>
  );
};
