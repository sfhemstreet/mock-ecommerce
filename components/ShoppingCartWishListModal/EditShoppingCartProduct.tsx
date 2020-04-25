import useSWR from "swr";
import { Centered } from "../Centered";
import { SpinningLoader } from "../SpinningLoader";
import { getProductById } from "../../queries/product/getProductById";
import { ShoppingCartProduct } from "../../storage/shoppingCart/shoppingCartTypes";
import { EditShoppingCartProductOptions } from "./EditShoppingCartProductOptions";

type EditShoppingCartProductProps = {
  onEdit: (item: ShoppingCartProduct) => void;
  item: ShoppingCartProduct | null;
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
 * @param onEdit
 * @param onCancel
 * @param item
 * @param width
 * @param height
 */
export const EditShoppingCartProduct = ({
  onEdit,
  item,
  onCancel,
  width,
  height
}: EditShoppingCartProductProps) => {
  const productData = useSWR(item?.id || "", getProductById);

  if (!productData.data || !item) {
    return (
      <Centered>
        <SpinningLoader />
      </Centered>
    );
  }

  return (
    <EditShoppingCartProductOptions
      width={width}
      height={height}
      onEdit={onEdit}
      originalItem={item}
      product={productData.data}
      onCancel={onCancel}
    />
  );
};
