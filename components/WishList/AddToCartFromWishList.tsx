import useSWR from "swr";
import { Centered } from "../Centered";
import { SpinningLoader } from "../SpinningLoader";
import { getProductById } from "../../queries/product/getProductById";
import { WishListProduct } from "../../storage/wishlist/wishListTypes";
import { AddToCartFromWishListOptions } from "./AddToCartFromWishListOptions";

type AddToCartFromWishListProps = {
  item: WishListProduct | null;
  onCancel: () => void;
  width: number;
  height: number;
};

/**
 * Edit a Stored Product in the TopRightModal.
 *
 * Fetches the product info to let user see all
 * options available and change to any of them.
 *
 * @param onCancel
 * @param item
 * @param width
 * @param height
 */
export const AddToCartFromWishList = ({
  item,
  onCancel,
  width,
  height
}: AddToCartFromWishListProps) => {
  const productData = useSWR(item?.id || "", getProductById);

  if (!productData.data || !item) {
    return (
      <Centered>
        <SpinningLoader />
      </Centered>
    );
  }

  return (
    <AddToCartFromWishListOptions
      width={width}
      height={height}
      product={productData.data}
      onCancel={onCancel}
    />
  );
};