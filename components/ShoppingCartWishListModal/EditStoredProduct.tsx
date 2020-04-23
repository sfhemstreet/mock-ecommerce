import useSWR from "swr";
import { StoredProduct } from "../../storage/types";

import { Centered } from "../Centered";
import { SpinningLoader } from "../SpinningLoader";
import { getProductById } from "../../queries/product/getProductById";

import { EditStoredProductOptions } from "./EditStoredProductOptions";

type EditStoredProductProps = {
  onEdit: (item: StoredProduct) => void;
  item: StoredProduct | null;
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
export const EditStoredProduct = ({
  onEdit,
  item,
  onCancel,
  width,
  height
}: EditStoredProductProps) => {
  const productData = useSWR(item?.id || "", getProductById);

  if (!productData.data || !item) {
    return (
      <Centered>
        <SpinningLoader />
      </Centered>
    );
  }

  return (
    <EditStoredProductOptions
      width={width}
      height={height}
      onEdit={onEdit}
      originalItem={item}
      product={productData.data}
      onCancel={onCancel}
    />
  );
};
