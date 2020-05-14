import styled from "styled-components";
import { WishListProduct } from "../../storage/wishlist/wishListTypes";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { SpinningLoader } from "../SpinningLoader";
import { RemoveIcon } from "../RemoveIcon";
import { mutateModalsState, mutateWishList } from "../../storage/storage";
import { removeItemFromWishlist } from "../../storage/wishlist/wishListActions";
import { AddToCartSmallIcon } from "../AddToCartSmallIcon";
import { Padded } from "../Padded";
import { useState, useEffect } from "react";
import { Transformed } from "../Transformed";
import { useRouter } from "next/router";
import {
  closeWishListModal,
  stopEditWishListModal,
  startEditWishListModal,
} from "../../storage/modals/modalActions";
import { SwitchTransition, Transition } from "react-transition-group";
import { FadeContainer } from "../SearchBox/SearchIcon";
import { AddToCartFromWishList } from "./AddToCartFromWishList";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { mediaSizes } from "../DisplayAtMedia";

const ProductImg = styled.img`
  width: 100px;
  height: auto;
`;

const WishListContainer = styled.div`
  width: 100%;
  height: 99%;

  overflow-y: scroll;
  overflow-x: hidden;

  margin: 3px;
`;

const GridContainer = styled.div`
  width: 100%;
  min-height: 100px;

  display: grid;
  grid-template-columns: 120px 1fr 40px;
  grid-template-areas: "image name edit";
  gap: 3px 3px;

  background-color: white;
  color: ${(props) => props.theme.colors.black};
`;

const ScrollArea = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;
  overflow-x: hidden;
`;

const GridItem = styled.div<{ name: string }>`
  grid-area: ${(props) => props.name};
`;

const LinkContainer = styled.a`
  text-decoration: none;
  display: block;
  cursor: pointer;

  transition: color 0.3s ease-in;

  :hover {
    color: ${(props) => props.theme.colors.green};
  }
`;

type WishListProductListProps = {
  products: WishListProduct[] | undefined;
};

export const WishListProductList = ({ products }: WishListProductListProps) => {
  const router = useRouter();

  // Save local copy of products so we can animate the list
  const [displayedProducts, setDisplayedProducts] = useState(
    products ? [...products] : []
  );

  // Save reomved product id for animating it out of list
  const [removedProduct, setRemovedProduct] = useState<WishListProduct | null>(
    null
  );

  // Holds item we want to add to cart, or null if none.
  const [addItem, setAddItem] = useState<WishListProduct | null>(null);

  // Screen width to calculate width and height of containers on mobile screens
  const [width, height] = useWindowDimensions();

  // Handle Start Add
  const handleStartAddToCart = (item: WishListProduct) => {
    mutateModalsState(startEditWishListModal());
    setAddItem(item);
  };

  // Handle Cancel Add
  const handleCancelAddToCart = () => {
    mutateModalsState(stopEditWishListModal());
    setAddItem(null);
    setDisplayedProducts(products ? [...products] : []);
  };

  const handleRemove = (item: WishListProduct) => {
    // Animate item out of list
    setRemovedProduct(item);

    // Let animation finish before removing local version of item
    setTimeout(() => {
      setDisplayedProducts([
        ...displayedProducts.filter((i) => i.id !== item.id),
      ]);
    }, 300);
    // After local version is removed, remove from WishList
    setTimeout(() => {
      mutateWishList(removeItemFromWishlist(item.id));
    }, 500);
  };

  const handleGoToProduct = (product: WishListProduct) => {
    router.push("/product/[productSlug]", `/product/${product.slug}`);
    if (width < mediaSizes.tablet) {
      mutateModalsState(closeWishListModal());
    }
  };

  // Whenever products changes we want to wait a tiny bit for the animations,
  // then update our local copy of the list.
  useEffect(() => {
    setTimeout(() => {
      setDisplayedProducts(products ? [...products] : []);
    }, 50);
  }, [products]);

  if (products === undefined) return <SpinningLoader />;

  return (
    <WishListContainer>
      <SwitchTransition mode={"out-in"}>
        <Transition
          key={addItem === null ? "ListScreen" : "AddScreen"}
          timeout={200}
        >
          {(state) => (
            <FadeContainer state={state}>
              {addItem === null ? (
                <ScrollArea>
                  {products.map((product, index) => (
                    <Transformed
                      isTransformed={
                        removedProduct !== null &&
                        removedProduct.id === product.id
                      }
                      transform={"translateX(500px)"}
                      transition={"all 0.3s ease-in"}
                      key={`WishListItem${product.id}-${index}`}
                    >
                      <Padded padding={"1px 0px"}>
                        <GridContainer>
                          <GridItem name={"image"}>
                            <ProductImg
                              src={
                                process.env.BACKEND_URL + product.Preview.url
                              }
                              loading="lazy"
                              alt={`${product.Name} by ${product.Brand.Name}`}
                            />
                          </GridItem>
                          <GridItem name={"name"}>
                            <Column justifyEvenly>
                              <LinkContainer
                                onClick={() => handleGoToProduct(product)}
                              >
                                <Txt small>{product.Brand.Name}</Txt>
                                <Txt bold>{product.Name}</Txt>
                              </LinkContainer>
                              <Txt big bold>
                                {`$${product.Price}`}
                              </Txt>
                            </Column>
                          </GridItem>
                          <GridItem name={"edit"}>
                            <Column justifyEvenly>
                              <AddToCartSmallIcon
                                onClick={() => handleStartAddToCart(product)}
                              />
                              <RemoveIcon
                                onClick={() => handleRemove(product)}
                              />
                            </Column>
                          </GridItem>
                        </GridContainer>
                      </Padded>
                    </Transformed>
                  ))}
                </ScrollArea>
              ) : (
                <AddToCartFromWishList
                  onCancel={handleCancelAddToCart}
                  item={addItem}
                  width={width}
                  height={height}
                />
              )}
            </FadeContainer>
          )}
        </Transition>
      </SwitchTransition>
    </WishListContainer>
  );
};
