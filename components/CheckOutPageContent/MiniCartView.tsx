import styled from "styled-components";
import { ShoppingCart } from "../../storage/shoppingCart/shoppingCartTypes";
import { mediaDevices } from "../DisplayAtMedia";
import { Txt } from "../Txt";

const MiniCartContainer = styled.div`
  position: sticky;
  top: 20px;

  width: 290px;
  border: solid 1px ${(props) => props.theme.colors.black};
  border-radius: 3px;

  padding: 5px;
  margin: 10px 20px 1500px 0px;

  display: none;

  @media ${mediaDevices.tablet} {
    display: block;
  }
`;

const MiniCartItem = styled.div<{ hasBottomLine?: boolean }>`
  display: grid;
  grid-template-columns: 50px 1fr 0.7fr;
  grid-template-areas: "pic item details";
  grid-template-rows: 1fr;
  gap: 3px 4px;

  padding: 5px 0px;

  border-bottom: ${(props) =>
    props.hasBottomLine
      ? `solid 1px ${props.theme.colors.transparentBlack}`
      : "none"};
`;

const ImgArea = styled.div`
  grid-area: pic;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemArea = styled.div`
  grid-area: item;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;

const DetailsArea = styled.div`
  grid-area: details;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;

const MiniCartImg = styled.img`
  width: 50px;
  height: auto;
`;

type MiniCartViewProps = {
  cart: ShoppingCart;
};

export const MiniCartView = ({ cart }: MiniCartViewProps) => (
  <MiniCartContainer>
    <Txt bold underline alignCenter>
      Cart
    </Txt>
    {cart.products.map((product, index) => (
      <MiniCartItem
        hasBottomLine={cart.products.length - 1 !== index}
        key={`mini-cart-${product.timeAdded}`}
      >
        <ImgArea>
          <MiniCartImg
            src={process.env.BACKEND_URL + product.Preview.url}
            alt={product.Name}
          />
        </ImgArea>
        <ItemArea>
          <div>
            <Txt small>{product.Brand.Name}</Txt>
            <Txt bold>{product.Name}</Txt>
          </div>
        </ItemArea>
        <DetailsArea>
          <div>
            <Txt small>{`${product.Color}, ${product.Size}`}</Txt>
            <Txt small>{`Quantity: ${product.Quantity}`}</Txt>
          </div>
        </DetailsArea>
      </MiniCartItem>
    ))}
  </MiniCartContainer>
);
