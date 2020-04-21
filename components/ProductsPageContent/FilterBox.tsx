import styled from "styled-components";
import { Category, ProductPreview } from "../../queries/types";
import { OutlinedBox } from "./OutlinedBox";
import { Txt } from "../Txt";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { Padded } from "../Padded";
import { Row } from "../Row";
import { useState } from "react";
import { Column } from "../Column";

const CheckBox = styled.input`
  width: 18px;
  height: 18px;
  border-radius: 4px;

  background-color: ${props => props.theme.colors.white};

  transition: all 0.3s ease-in-out;

  :checked {
    background-color: ${props => props.theme.colors.black};
  }
`;

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

export type FilterKeyObj = {
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
  let lowestPrice = Math.floor(products[0].Price);
  let highestPrice = Math.floor(products[0].Price);

  // Track colors, sizes, brands of products without duplicates.
  const colors: FilterKeyObj = {};
  const sizes: FilterKeyObj = {};
  const brands: FilterKeyObj = {};

  products.forEach(product => {
    // Discount filter is not displayed if no products
    // have a discount and is left as undefined.
    if (product.Discount > 0) filterOptions.Discount = false;

    if (product.Price < lowestPrice) lowestPrice = Math.floor(product.Price);

    if (product.Price > highestPrice) highestPrice = Math.floor(product.Price);

    // We need all the colors, sizes and brands without duplicates.
    product.AvailableColors.split(",").forEach(color => (colors[color.trim()] = true));
    product.AvailableSizes.split(",").forEach(size => (sizes[size.trim()] = true));
    brands[product.Brand.Name] = true;
  });

  // Remove 10 from lowest price so that slider is easier to use
  // But check first if you can, do 5 if you can't.
  filterOptions.Price.Low =
    lowestPrice - 10 >= 0
      ? lowestPrice - 10
      : lowestPrice - 5 >= 0
      ? lowestPrice - 5
      : lowestPrice;
  filterOptions.Price.High = highestPrice + 10;
  filterOptions.Brand = Object.keys(brands);
  filterOptions.Color = Object.keys(colors);

  // Sort letter sizes 
  const letterSizes = Array<string>();
  const sequentialPotentialSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
  for(const size of sequentialPotentialSizes) {
    if (sizes[size]) {
      letterSizes.push(size);
      delete sizes[size];
    }
  }

  // Sort number sizes
  const numSizes = Object.keys(sizes);
  numSizes.sort((a,b) => (parseFloat(a) - parseFloat(b)));

  // Join sizes
  filterOptions.Size = [...letterSizes, ...numSizes];

  return filterOptions;
}

type FilterBoxProps = {
  onChange: (filter: FilterOptionsObj) => void;
  filterOptions: FilterOptionsObj;
};

/**
 * Displays a box of all possible filter options and checkboxes to select them.
 * @param onChange
 * @param filterOptions
 */
export const FilterBox = ({ onChange, filterOptions }: FilterBoxProps) => {
  const keys = Object.keys(filterOptions);

  const [filter, setFilter] = useState<FilterOptionsObj>({
    Price: {
      Low: filterOptions.Price.Low,
      High: filterOptions.Price.High
    },
    Brand: Array<string>(),
    Color: Array<string>(),
    Size: Array<string>(),
    Discount: filterOptions.Discount,
    subCategories: !filterOptions.subCategories ? undefined : Array<Category>()
  });

  const handlePriceChange = (low: number, high: number) => {
    const maxLow = filterOptions.Price.Low;
    const maxHigh = filterOptions.Price.High;
    const ratio = (maxHigh - maxLow) / (100 - 0);
    // Change 0 - 100 numbers into maxLow - maxHigh number.
    const l = Math.floor(maxLow + low * ratio + ratio) - 5;
    const h = Math.floor(maxLow + high * ratio + ratio) - 5;

    setFilter({
      ...filter,
      Price: {
        Low: l,
        High: h
      }
    });
    onChange({
      ...filter,
      Price: {
        Low: l,
        High: h
      }
    });
  };

  const handleBrandChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    brand: string
  ) => {
    const f: FilterOptionsObj = {
      ...filter,
      Brand: evt.target.checked
        ? [...filter.Brand, brand]
        : [...filter.Brand.filter(b => b !== brand)]
    };
    setFilter(f);
    onChange(f);
  };

  const handleSizeChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    size: string
  ) => {
    const f: FilterOptionsObj = {
      ...filter,
      Size: evt.target.checked
        ? [...filter.Size, size]
        : [...filter.Size.filter(s => s !== size)]
    };
    setFilter(f);
    onChange(f);
  };

  const handleColorChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    color: string
  ) => {
    const f: FilterOptionsObj = {
      ...filter,
      Color: evt.target.checked
        ? [...filter.Color, color]
        : [...filter.Color.filter(c => c !== color)]
    };
    setFilter(f);
    onChange(f);
  };

  const handleDiscountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const f: FilterOptionsObj = {
      ...filter,
      Discount: evt.target.checked
    };
    setFilter(f);
    onChange(f);
  };

  const handleSubcategoryChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    const f: FilterOptionsObj = {
      ...filter,
      subCategories: !filter.subCategories
        ? undefined
        : evt.target.checked
        ? [...filter.subCategories, category]
        : [...filter.subCategories.filter(c => c.id !== category.id)]
    };
    setFilter(f);
    onChange(f);
  };

  return (
    <>
      <Txt bold>Filter</Txt>
      <OutlinedBox>
        {keys.map((key, index) => {
          switch (key) {
            case "Price":
              return (
                <Padded padding={"10px 0px 0px 5px"} key={`filterOption${key}`}>
                  <Row>
                    <Txt>Price: </Txt>
                    <Txt padding={"0px 3px 0px 10px"}>${filter.Price.Low}</Txt>
                    <Txt>-</Txt>
                    <Txt padding={"0px 3px"}>${filter.Price.High}</Txt>
                  </Row>
                  <Padded padLeft={"4px"}>
                    <PriceRangeSlider
                      onChange={(l, h) => handlePriceChange(l, h)}
                    />
                  </Padded>
                </Padded>
              );
            case "Brand":
              return (
                <Padded padding={"10px 0px 0px 5px"} key={`filterOption${key}`}>
                  <Column justifyEvenly>
                    <Txt>Brand: </Txt>
                    {filterOptions.Brand.map(brand => (
                      <Padded
                        padding={"0px 20px"}
                        key={`filterOption${key}${brand}`}
                      >
                        <Row alignCenter justifyBetween>
                          <Txt small>{brand}</Txt>
                          <CheckBox
                            type="checkbox"
                            onChange={evt => handleBrandChange(evt, brand)}
                          />
                        </Row>
                      </Padded>
                    ))}
                  </Column>
                </Padded>
              );
            case "Color":
              return (
                <Padded padding={"10px 0px 0px 5px"} key={`filterOption${key}`}>
                  <Column justifyEvenly>
                    <Txt>Color: </Txt>
                    {filterOptions.Color.map(color => (
                      <Padded
                        padding={"0px 20px"}
                        key={`filterOption${key}${color}`}
                      >
                        <Row alignCenter justifyBetween>
                          <Txt small>{color}</Txt>
                          <CheckBox
                            type="checkbox"
                            onChange={evt => handleColorChange(evt, color)}
                          />
                        </Row>
                      </Padded>
                    ))}
                  </Column>
                </Padded>
              );
            case "Size":
              return (
                <Padded padding={"10px 0px 0px 5px"} key={`filterOption${key}`}>
                  <Column justifyEvenly>
                    <Txt>Size: </Txt>
                    {filterOptions.Size.map(size => (
                      <Padded
                        padding={"0px 20px"}
                        key={`filterOption${key}${size}`}
                      >
                        <Row alignCenter justifyBetween>
                          <Txt small>{size}</Txt>
                          <CheckBox
                            type="checkbox"
                            onChange={evt => handleSizeChange(evt, size)}
                          />
                        </Row>
                      </Padded>
                    ))}
                  </Column>
                </Padded>
              );
            case "Discount":
              return filterOptions.Discount === undefined ? null : (
                <Padded
                  padding={"10px 20px 0px 5px"}
                  key={`filterOption${key}`}
                >
                  <Row alignCenter justifyBetween>
                    <Txt>Discount: </Txt>
                    <CheckBox type="checkbox" onChange={handleDiscountChange} />
                  </Row>
                </Padded>
              );
            case "subCategories":
              return !filterOptions.subCategories ? null : (
                <Column justifyEvenly key={`filterOption${key}`}>
                  {filterOptions.subCategories.map(cat => (
                    <Padded
                      padding={"10px 20px 0px 5px"}
                      key={`filterOption${key}${cat.Name}`}
                    >
                      <Row alignCenter justifyBetween>
                        <Txt >{cat.Name}</Txt>
                        <CheckBox
                          type="checkbox"
                          onChange={evt => handleSubcategoryChange(evt, cat)}
                        />
                      </Row>
                    </Padded>
                  ))}
                </Column>
              );
            default:
              return;
          }
        })}
      </OutlinedBox>
    </>
  );
};
