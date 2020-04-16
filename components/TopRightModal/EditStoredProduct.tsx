import styled from "styled-components";
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
};

export const EditStoredProduct = ({
  onEdit,
  item,
  onCancel
}: EditStoredProductProps) => {
  // TODO
  // add SWR to this page to fetch product info
  // to fetch and display all options available
  // on product so user can edit

  const productData = useSWR(item?.id || "", getProductById);

  if (!productData.data || !item) {
    return (
      <Centered>
        <SpinningLoader />
      </Centered>
    );
  }

  return <EditStoredProductOptions onEdit={onEdit} originalItem={item} product={productData.data} onCancel={onCancel} />
};
