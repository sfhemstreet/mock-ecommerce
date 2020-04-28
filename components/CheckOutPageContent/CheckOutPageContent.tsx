import styled from 'styled-components';
import useSWR from "swr";
import { SpinningLoader } from '../SpinningLoader';
import { SHOPPING_CART, getShoppingCart } from '../../storage/storage';
import { Centered } from '../Centered';
import { Txt } from '../Txt';

export const CheckOutPageContent = () => {

  const shoppingCart = useSWR(SHOPPING_CART, getShoppingCart);

  if (!shoppingCart.data) return (
    <Centered>
       <SpinningLoader reverse />
    </Centered>
  )

  if (shoppingCart.data.products.length === 0) return (
    <Centered>
      <Txt alignCenter bold big padding={"250px 0px"}>
        No Products in Shopping Cart
      </Txt>
    </Centered>
  )
  
  return (
    <Centered>

    </Centered>
  );
}