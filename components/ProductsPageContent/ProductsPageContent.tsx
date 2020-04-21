import styled from 'styled-components';
import { useState } from "react";
import { Row } from "../Row";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";
import { Padded } from "../Padded";
import { FilterIcon } from "./FilterIcon";
import { Txt } from "../Txt";
import { SortIcon } from "./SortIcon";
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
import { Centered } from "../Centered";

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

const ProductsAndFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  max-width: 1400px;
  min-height: 800px;
  width: 100%;
  
  @media ${mediaDevices.laptop} {
    justify-content: flex-start;
  }
`; 

type ProductsPageContentProps = {
  title: string;
  subcategories?: Category[];
  products: ProductPreview[];
};

/**
 * Displays given products with filter and sort options.
 * For use in Pages that display lists of products.
 *
 * @param title
 * @param products
 * @param subcategories
 */
export const ProductsPageContent = ({
  title,
  products,
  subcategories
}: ProductsPageContentProps) => {
  const filterOptions = createFilterOptions(products, subcategories);

  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [sortOption, setSortOption] = useState<SortOptionTypes>(SORT_NONE)
  const [isSortModal, setIsSortModal] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);

  
  const handleSort = (option: SortOptionTypes, products: ProductPreview[]) => {
    switch (option) {
      case SORT_MOST_RECENT:
        return [
          ...products.sort(
            (a, b) =>
            // Well this is what we will do for now
            b.Ranking - a.Ranking
          )
        ];
        
      case SORT_RANKING_HI_LO:
        return [
          ...products.sort((a, b) => a.Ranking - b.Ranking)
        ];
      case SORT_PRICE_LO_HI:
        return [
          ...products.sort((a, b) => a.Price - b.Price)
        ];
      case SORT_PRICE_HI_LO:
        return [
          ...products.sort((a, b) => b.Price - a.Price)
        ];
      default:
        return products;
    }
  };

  const handleFilter = (filter: FilterOptionsObj) => {
    // Go thru all products and remove products
    // that don't have properties of filter.
    const p = products.filter(product => {
      // Go thru each filter key in filter
      for (const key in filter) {
        if (key === "Size") {
          // Zero length means filter is inactive.
          if (filter.Size.length === 0) continue;
          // See if product is offered in size required by filter.
          // Put all sizes in filter into sizesMap.
          const sizesMap = {} as FilterKeyObj;
          for (const s of filter.Size) {
            sizesMap[s] = true;
          }
          // Go thru products offered sizes and check if size is in sizeMap.
          // On first match we can stop, as it passes this filter.
          let pass = false;
          const sizes = product.AvailableSizes.split(",");
          for (const size of sizes) {
            if (sizesMap[size]) {
              // As soon as we have a match the product passes.
              pass = true;
              break;
            }
          }
          if (pass) continue;
          else return false;
        } else if (key === "Color") {
          // Zero length means filter is inactive.
          if (filter.Color.length === 0) continue;
          // See if product is offered in color required by filter.
          // Put all colors in filter into colorsMap.
          const colorsMap = {} as FilterKeyObj;
          for (const c of filter.Color) {
            colorsMap[c] = true;
          }
          // Go thru products offered colors, and check if color is in colorsMap.
          // On first match we can stop, as it passes this filter.
          let pass = false;
          const colors = product.AvailableColors.split(",");
          for (const color of colors) {
            if (colorsMap[color]) {
              pass = true;
              break;
            }
          }
          if (pass) continue;
          else return false;
        } else if (key === "Brand") {
          // Check if brand filter is active.
          if (filter.Brand.length === 0) continue;
          // If our brand filter includes this products brand it passes.
          if (filter.Brand.includes(product.Brand.Name)) continue;
          else return false;
        } else if (key === "Price") {
          // Check if product price is in filter price range
          if (
            product.Price > filter.Price.Low &&
            product.Price < filter.Price.High
          )
            continue;
          else return false;
        } else if (key === "Discount") {
          // Checks if discount filter is in use.
          if (filter.Discount === undefined) continue;
          // Checks if filter is inactive.
          if (!filter.Discount) continue;
          // Checks if product has a discount, as filter is active down here.
          if (product.Discount > 0) continue;
          else return false;
        }
      }
      return true;
    });
    const sortedP = handleSort(sortOption, p);
    setFilteredProducts(sortedP);
  };

  const handleSortChange = (option: SortOptionTypes) => {
    const p = handleSort(option, filteredProducts);
    setFilteredProducts(p);
    setSortOption(option);
  }

  return (
    <Centered>

    
    <Contained maxWidth={"1400px"} width={"100%"}>
      <Column justifyCenter alignCenter>
        <Row justifyEvenly alignCenter>
          {/* Mobile Filter Icon */}
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

          {/* Title of Page */}
          <Txt alignCenter big bold padding={"10px 5px"}>
            {title}
          </Txt>

          {/* Mobile Sort Icon */}
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

       
        <Contained maxWidth={"1400px"} width={"100%"} minHeight={"800px"}>
          <ProductsAndFilterContainer>
            {/* Displays SortBox and FilterBox on left side of products */}
            <DisplayAtMedia laptop desktop>
              <Padded padding={"0px 30px 10px 40px"}>
                <Column>
                  <SortBox
                    options={sortOptions}
                    onSelect={option => handleSortChange(option as SortOptionTypes)}
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

            {/* Displays Filtered Products */}
            <ProductPreviewCardsList products={filteredProducts} />
          </ProductsAndFilterContainer>
        </Contained>
      </Column>
    </Contained>
    </Centered>
  );
};
