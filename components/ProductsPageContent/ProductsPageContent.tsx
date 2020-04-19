import useSWR from "swr";
import { useState } from "react";
import { Row } from "../Row";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { Padded } from "../Padded";
import { FilterIcon } from "../FilterIcon";
import { Txt } from "../Txt";
import { SortIcon } from "../SortIcon";
import { Contained } from "../Contained";
import { ProductPreviewCardsList } from "../ProductPreviewCard/ProductPreviewCardsList";
import { ProductPreview, Category } from "../../queries/types";
import { Column } from "../Column";
import {
  FilterOptionsObj,
  FilterBox,
  createFilterOptions,
  FilterKeyObj
} from "./FilterBox";
import { SortBox } from "./SortBox";

export const SORT_NONE = "None";
export const SORT_PRICE_LO_HI = "Price: Low to High";
export const SORT_PRICE_HI_LO = "Price: High to Low";
export const SORT_RANKING_HI_LO = "Most Popular";
export const SORT_MOST_RECENT = "Most Recent";

export type SortOptionTypes =
  | typeof SORT_NONE
  | typeof SORT_PRICE_HI_LO
  | typeof SORT_PRICE_LO_HI
  | typeof SORT_RANKING_HI_LO
  | typeof SORT_MOST_RECENT;

export const sortOptions = [
  //SORT_NONE,
  SORT_MOST_RECENT,
  SORT_RANKING_HI_LO,
  SORT_PRICE_LO_HI,
  SORT_PRICE_HI_LO
] as SortOptionTypes[];

const initFilter: FilterOptionsObj = {
  Price: { Low: 1, High: 5000 },
  Brand: Array<string>(),
  Color: Array<string>(),
  Size: Array<string>(),
  Discount: undefined,
  subCategories: undefined
};

type ProductsPageContentProps = {
  title: string;
  subcategories?: Category[];
  products: ProductPreview[];
};

export const ProductsPageContent = ({
  title,
  products,
  subcategories
}: ProductsPageContentProps) => {
  const filterOptions = createFilterOptions(products, subcategories);

  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [isSortModal, setIsSortModal] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);

  // This can be more effecient.
  const handleFilter = (filter: FilterOptionsObj) => {
    // Go thru all products and remove products
    // that don't meet have properties of filter.
    const p = products.filter(product => {
      for (const key in filter) {
        if (key === "Size") {
          // Check if its active. Zero length is inactive.
          if (filter.Size.length === 0) continue;
          // See if product is offered in size dictated by filter.
          const sizesMap = {} as FilterKeyObj;
          for (const s of filter.Size) {
            sizesMap[s] = true;
          }
          let pass = false;
          const sizes = product.AvailableSizes.split(",");
          for (let i = 0; i < sizes.length; i++) {
            if (sizesMap[sizes[i]]) {
              // As soon as we have a match the product passes.
              pass = true;
              break;
            }
          }
          if (pass) continue;
          else return false;
        } else if (key === "Color") {
          if (filter.Color.length === 0) continue;

          const colorsMap = {} as FilterKeyObj;
          for (const c of filter.Color) {
            colorsMap[c] = true;
          }
          let pass = false;
          const colors = product.AvailableColors.split(",");
          for (let i = 0; i < colors.length; i++) {
            if (colorsMap[colors[i]]) {
              pass = true;
              break;
            }
          }
          if (pass) continue;
          else return false;
        } else if (key === "Brand") {
          if (filter.Brand.length === 0) continue;
          if (filter.Brand.includes(product.Brand.Name)) continue;
          else return false;
        } else if (key === "Price") {
          if (
            product.Price > filter.Price.Low &&
            product.Price < filter.Price.High
          )
            continue;
          else return false;
        } else if (key === "Discount") {
          if (filter.Discount === undefined) continue;

          if (!filter.Discount) continue;

          if (product.Discount > 0) continue;
          else return false;
        }
      }
      return true;
    });

    setFilteredProducts(p);
  };

  const handleSort = (option: SortOptionTypes) => {
    switch (option) {
      case SORT_MOST_RECENT:
        setFilteredProducts([
          ...filteredProducts.sort(
            (a, b) =>
              // Well this is what we will do for now
              Math.random() - Math.random()
          )
        ]);
        break;
      case SORT_RANKING_HI_LO:
        setFilteredProducts([
          ...filteredProducts.sort((a, b) => a.Ranking - b.Ranking)
        ]);
        break;
      case SORT_PRICE_LO_HI:
        setFilteredProducts([
          ...filteredProducts.sort((a, b) => a.Price - b.Price)
        ]);
        break;
      case SORT_PRICE_HI_LO:
        setFilteredProducts([
          ...filteredProducts.sort((a, b) => b.Price - a.Price)
        ]);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Row justifyEvenly alignCenter>
        <DisplayAtMedia mobile tablet>
          <Padded padding="10px">
            <FilterIcon
              onClick={() => {
                setIsSortModal(false);
                setIsFilterModal(true);
              }}
            />
          </Padded>
        </DisplayAtMedia>

        <Txt alignCenter big bold padding={"10px 5px"}>
          {title}
        </Txt>

        <DisplayAtMedia mobile tablet>
          <Padded padding="10px">
            <SortIcon
              onClick={() => {
                setIsFilterModal(false);
                setIsSortModal(true);
              }}
            />
          </Padded>
        </DisplayAtMedia>
      </Row>
      <Contained width={"100%"} minHeight={"600px"}>
        <Row justifyCenter>
          <DisplayAtMedia laptop desktop>
            <Padded padding={"0px 10px 10px 10px"}>
              <Column>
                <SortBox
                  options={sortOptions}
                  onSelect={option => handleSort(option as SortOptionTypes)}
                />
                <Padded padTop={"40px"}>
                  <FilterBox
                    filterOptions={filterOptions}
                    onChange={(f: FilterOptionsObj) => handleFilter(f)}
                  />
                </Padded>
              </Column>
            </Padded>
          </DisplayAtMedia>
          <ProductPreviewCardsList products={filteredProducts} />
        </Row>
      </Contained>
    </>
  );
};
