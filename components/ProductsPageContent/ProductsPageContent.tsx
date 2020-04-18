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
import { FilterOptionsObj, FilterBox, createFilterOptions } from "./FilterBox";
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
  SORT_PRICE_HI_LO,
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

  const [sort, setSort] = useState<SortOptionTypes>(SORT_NONE);
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [isSortModal, setIsSortModal] = useState(false);
  const [isFilterModal, setIsFilterModal] = useState(false);

  const handleFilter = (filter: FilterOptionsObj) => {};

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

  console.log(filterOptions);

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
                    onSelect={(f: FilterOptionsObj) => handleFilter(f)}
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
