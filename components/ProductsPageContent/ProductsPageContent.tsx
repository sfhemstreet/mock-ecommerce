import styled from "styled-components";
import { useState, useEffect } from "react";
import { DisplayAtMedia, mediaDevices } from "../DisplayAtMedia";
import { Padded } from "../Padded";
import { FilterIcon } from "./components/FilterIcon";
import { Txt } from "../Txt";
import { Contained } from "../Contained";
import { ProductPreviewCardsList } from "../ProductPreviewCard/ProductPreviewCardsList";
import { ProductPreview } from "../../queries/types";
import { Column } from "../Column";
import {
  FilterOptionsObj,
  FilterBox,
  createFilterOptions,
  FilterKeyObj,
} from "./components/FilterBox";
import { SortBox } from "./components/SortBox";
import { Centered } from "../Centered";
import Transition from "react-transition-group/Transition";
import { Positioned } from "../Positioned";
import { SlideIn, SlideInChild } from "./components/SlideIn";

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
  SORT_PRICE_HI_LO,
] as SortOptionTypes[];

const ProductsAndFilterContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  max-width: 1400px;
  min-height: 800px;
  width: 100%;

  @media ${mediaDevices.laptop} {
    justify-content: flex-start;
  }
`;

type ProductsPageContentProps = {
  title: string;
  products: ProductPreview[];
  displayCategoryFilter?: boolean;
  displaySubcategoryFilter?: boolean;
};

/**
 * Displays given products with filter and sort options.
 * For use in Pages that display lists of products.
 *
 * @param title
 * @param products
 * @param displayCategoryFilter
 * @param displaySubcategoryFilter
 */
export const ProductsPageContent = ({
  title,
  products,
  displayCategoryFilter,
  displaySubcategoryFilter,
}: ProductsPageContentProps) => {
  const filterOptions = createFilterOptions(products);

  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [sortOption, setSortOption] = useState<SortOptionTypes>(SORT_NONE);
  const [isShowingSortFilter, setShowSortFilter] = useState(false);

  const handleSort = (option: SortOptionTypes, products: ProductPreview[]) => {
    switch (option) {
      case SORT_MOST_RECENT:
        return [
          ...products.sort(
            (a, b) =>
              // Well this is what we will do for now
              b.Ranking - a.Ranking
          ),
        ];

      case SORT_RANKING_HI_LO:
        return [...products.sort((a, b) => a.Ranking - b.Ranking)];
      case SORT_PRICE_LO_HI:
        return [...products.sort((a, b) => a.Price - b.Price)];
      case SORT_PRICE_HI_LO:
        return [...products.sort((a, b) => b.Price - a.Price)];
      default:
        return products;
    }
  };

  const handleFilter = (filter: FilterOptionsObj) => {
    // Go thru all products and remove products
    // that don't have properties of filter.
    const p = products.filter((product) => {
      // Go thru each filter key in filter
      for (const key in filter) {
        // SIZE
        if (key === "Size") {
          // Zero length means filter is inactive, skip it.
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
          // COLOR
        } else if (key === "Color") {
          // Zero length means filter is inactive, skip it.
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
          // BRAND
        } else if (key === "Brand") {
          // Zero length means filter is inactive, skip it.
          if (filter.Brand.length === 0) continue;
          // If our brand filter includes this products brand it passes.
          if (filter.Brand.includes(product.Brand.Name)) continue;
          else return false;
          // PRICE
        } else if (key === "Price") {
          // Check if product price is in filter price range
          if (
            product.Price > filter.Price.Low &&
            product.Price < filter.Price.High
          )
            continue;
          else return false;
          // DISCOUNT
        } else if (key === "Discount") {
          // Checks if discount filter is in use.
          if (filter.Discount === undefined) continue;
          // Checks if filter is inactive.
          if (!filter.Discount) continue;
          // Checks if product has a discount, as filter is active down here.
          if (product.Discount > 0) continue;
          else return false;
        } else if (key === "Category") {
          if (filter.Category.length === 0) continue;
          if (filter.Category.includes(product.Category.Name)) continue;
          else return false;
        } else if (key === "Subcategory") {
          if (filter.Subcategory.length === 0) continue;
          if (filter.Subcategory.includes(product.Subcategory.Name)) continue;
          else return false;
        }
      }
      return true;
    });
    const sortedP = handleSort(sortOption, p);
    setFilteredProducts(sortedP);
  };

  const handleSortChange = (option: SortOptionTypes) => {
    const sortedProducts = handleSort(option, filteredProducts);
    setFilteredProducts(sortedProducts);
    setSortOption(option);
  };

  useEffect(() => {
    setFilteredProducts([...products]);
  }, [title]);

  return (
    <Centered>
      <Contained maxWidth={"1400px"} width={"100%"}>
        <Column justifyCenter alignCenter>
          {/* Mobile Tablet Filter Sort Icon */}
          <DisplayAtMedia mobile tablet>
            <Positioned absolute top={"15px"} right={"20px"}>
              <FilterIcon
                onClick={() => setShowSortFilter(!isShowingSortFilter)}
              />
            </Positioned>
          </DisplayAtMedia>

          {/* Title of Page */}
          <Txt alignCenter big bold padding={"20px 5px"}>
            {title}
          </Txt>

          {/* Products, Filter and Sort Box */}
          <ProductsAndFilterContainer>
            {/* Big screens, displays SortBox and FilterBox on left side of products */}
            <DisplayAtMedia laptop desktop>
              <Padded
                padding={
                  filteredProducts.length > 2
                    ? "0px 30px 10px 40px"
                    : "0px 110px 10px 40px"
                }
              >
                <Column>
                  <Txt bold>Sort</Txt>
                  <SortBox
                    options={sortOptions}
                    onSelect={(option) =>
                      handleSortChange(option as SortOptionTypes)
                    }
                  />
                  <Padded padding={"40px 0px"}>
                    <Txt bold>Filter</Txt>
                    <FilterBox
                      showCategories={displayCategoryFilter}
                      showSubcategories={displaySubcategoryFilter}
                      filterOptions={filterOptions}
                      onChange={(f: FilterOptionsObj) => handleFilter(f)}
                    />
                  </Padded>
                </Column>
              </Padded>
            </DisplayAtMedia>

            {/* Filtered Products */}
            <ProductPreviewCardsList products={filteredProducts} />
            {filteredProducts.length === 0 && (
              <Txt alignCenter bold padding={"100px"}>
                No Products Match Your Filter
              </Txt>
            )}

            {/* On Mobile and Tablet Filter and Sort Boxes
                    slide in from right off screen */}
            <DisplayAtMedia mobile tablet>
              <Transition
                in={isShowingSortFilter}
                timeout={{
                  enter: 10,
                  exit: 300,
                }}
                mountOnEnter
              >
                {(state) => (
                  <SlideIn state={state}>
                    <SlideInChild>
                      <Column>
                        <Txt bold>Sort</Txt>
                        <SortBox
                          options={sortOptions}
                          onSelect={(option) =>
                            handleSortChange(option as SortOptionTypes)
                          }
                        />
                        <Padded padding={"20px 0px"}>
                          <Txt bold>Filter</Txt>
                          <FilterBox
                            showCategories={displayCategoryFilter}
                            showSubcategories={displaySubcategoryFilter}
                            filterOptions={filterOptions}
                            onChange={(f: FilterOptionsObj) => handleFilter(f)}
                          />
                        </Padded>
                      </Column>
                    </SlideInChild>
                  </SlideIn>
                )}
              </Transition>
            </DisplayAtMedia>
          </ProductsAndFilterContainer>
        </Column>
      </Contained>
    </Centered>
  );
};
