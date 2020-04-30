import styled from 'styled-components';
import useSWR from "swr";
import { SpinningLoader } from '../SpinningLoader';
import { SHOPPING_CART, getShoppingCart } from '../../storage/storage';
import { Centered } from '../Centered';
import { Txt } from '../Txt';
import { useRouter } from 'next/router';
import { Contained } from '../Contained';
import { mediaDevices } from '../DisplayAtMedia';


const CheckoutItem = styled.div`
  display: flex;
`;

const ProductImg = styled.img`
  width: 150px;
  height: auto;

  @media ${mediaDevices.mobileM} {
    width: 160px;
  }

  @media ${mediaDevices.mobileL} {
    width: 200px;
  }

  @media ${mediaDevices.tablet} {
    width: 250px;
  }
`;


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
      <Contained maxWidth={"1000px"}>
        {shoppingCart.data.products.map(product => (
          <Contained key={`checkout-item-${product.timeAdded}`}>
            
          </Contained>
        ))}
      </Contained>
    </Centered>
  );
}