import styled from "styled-components";
import { Category, ProductPreview } from "../../queries/types";
import { OutlinedBox } from "./OutlinedBox";
import { Txt } from "../Txt";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { Padded } from "../Padded";

export type FilterOptionsObj = {
  Price: {
    Low: number;
    High: number;
  };
  Brand: string[];
  Color: string[];
  Size: string[];
  Discount: boolean | undefined;
  subCategories?: Category[];
};

type FilterKeyObj = {
  [key: string]: boolean;
};

/**
 * Creates FilterOptionsObj for given products and subcategories
 *
 * @param products
 * @param subcategories
 */
export function createFilterOptions(
  products: ProductPreview[],
  subcategories?: Category[]
): FilterOptionsObj {
  // Filter options available for products being displayed.
  // Whenever we get new products this should be updated.
  const filterOptions: FilterOptionsObj = {
    Price: { Low: 1, High: 5000 },
    Brand: Array<string>(),
    Color: Array<string>(),
    Size: Array<string>(),
    Discount: undefined,
    subCategories: subcategories
  };

  // Track highest and lowest price of products.
  let lowestPrice = products[0].Price;
  let highestPrice = products[0].Price;

  // Track colors, sizes, brands of products without duplicates.
  const colors: FilterKeyObj = {};
  const sizes: FilterKeyObj = {};
  const brands: FilterKeyObj = {};

  products.forEach(product => {
    // Discount filter is not displayed if no products
    // have a discount and is left as undefined.
    if (product.Discount > 0) filterOptions.Discount = false;

    if (product.Price < lowestPrice) lowestPrice = product.Price;

    if (product.Price > highestPrice) highestPrice = product.Price;

    // We need all the colors, sizes and brands.
    product.AvailableColors.split(",").forEach(color => (colors[color] = true));
    product.AvailableSizes.split(",").forEach(size => (sizes[size] = true));
    brands[product.Brand.Name] = true;
  });

  filterOptions.Price.Low = lowestPrice;
  filterOptions.Price.High = highestPrice;
  filterOptions.Brand = Object.keys(brands);
  filterOptions.Color = Object.keys(colors);
  filterOptions.Size = Object.keys(sizes);

  return filterOptions;
}

type FilterBoxProps = {
  onSelect: (filter: FilterOptionsObj) => void;
  filterOptions: FilterOptionsObj;
};

export const FilterBox = ({ onSelect, filterOptions }: FilterBoxProps) => {
  console.log(filterOptions);
  const keys = Object.keys(filterOptions);
  console.log(keys);

  const handlePriceChange = (low: number, high: number) => {

  }

  return (
    <>
      <Txt bold>Filter</Txt>
      <OutlinedBox>
        {keys.map((key, index) => {
          switch (key) {
            case "Price":
              return (
                <>
                  <Txt>Price: </Txt>
                  <Padded padLeft={"4px"}>
                    <PriceRangeSlider
                      low={filterOptions.Price.Low}
                      high={filterOptions.Price.High}
                      onChange={(l, h) => handlePriceChange(l, h)}
                    />  
                  </Padded>
                </>
              );
            case "Brand":
              return <Txt>Brand: </Txt>;
            case "Color":
              return <Txt>Color: </Txt>;
            case "Size":
              return <Txt>Size: </Txt>;
            case "Discount":
              return <Txt>Discount: </Txt>;
            case "subCategory":
            default:
              return;
          }
        })}
      </OutlinedBox>
    </>
  );
};
