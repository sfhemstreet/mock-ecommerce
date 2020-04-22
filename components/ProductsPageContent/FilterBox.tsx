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
  width: 50px;
  display: none;
`;


type LabelProps = {
  big?: boolean;
  small?: boolean;
  bold?: boolean;
  underline?: boolean;
  linethru?: boolean;
  overline?: boolean;
  isHighlighted?: boolean;
  doNotPad?: boolean;
};

const CheckBoxLabel = styled.label<LabelProps>`
  display: inline-block;
  width: ${props => props.doNotPad ? "163px" : "135px"};
  border-radius: 2px;
  padding: ${props => props.doNotPad ? "3px 3px 3px 3px" : "3px 3px 3px 20px"};
  font-weight: ${props => (props.bold ? "500" : "400")};
  font-size: ${props =>
    props.big
      ? props.theme.typography.bigFontSize
      : props.small
      ? props.theme.typography.smallFontSize
      : props.theme.typography.fontSize};
  text-decoration: ${props => {
    let text = "";
    if (props.underline) text += "underline ";
    if (props.overline) text += "overline ";
    if (props.linethru) text += "line-through ";
    if (text === "") return "none";
    else return text;
  }};
  transition: all 0.2s ease-in-out;

  transition: all 0.2s ease-in-out;

  background: ${props =>
    props.isHighlighted ? props.theme.colors.white : "none"};
  color: ${props =>
    props.isHighlighted ? props.theme.colors.black : props.theme.colors.white};
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
};

export type FilterKeyObj = {
  [key: string]: boolean;
};

/**
 * Creates FilterOptionsObj for given products
 *
 * @param products
 */
export function createFilterOptions(
  products: ProductPreview[]
): FilterOptionsObj {
  // Filter options available for products being displayed.
  // Whenever we get new products this should be updated.
  const filterOptions: FilterOptionsObj = {
    Price: { Low: 1, High: 5000 },
    Brand: Array<string>(),
    Color: Array<string>(),
    Size: Array<string>(),
    Discount: undefined
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
    product.AvailableColors.split(",").forEach(
      color => (colors[color.trim()] = true)
    );
    product.AvailableSizes.split(",").forEach(
      size => (sizes[size.trim()] = true)
    );
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
  for (const size of sequentialPotentialSizes) {
    if (sizes[size]) {
      letterSizes.push(size);
      delete sizes[size];
    }
  }

  // Sort number sizes
  const numSizes = Object.keys(sizes);
  numSizes.sort((a, b) => parseFloat(a) - parseFloat(b));

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
    Discount: filterOptions.Discount
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

  return (
    <>
      <Txt bold>Filter</Txt>
      <OutlinedBox>
        {keys.map((key, index) => {
          switch (key) {
            case "Discount":
              return filterOptions.Discount === undefined ? null : (
                <CheckBoxLabel
                  key={`filterOption${key}`}
                  isHighlighted={filter.Discount === true}
                  doNotPad
                >
                  On Sale
                  <CheckBox type="checkbox" onChange={handleDiscountChange} />
                </CheckBoxLabel>
              );

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
                      <CheckBoxLabel
                        key={`filterOption${key}${brand}`}
                        isHighlighted={
                          filter.Brand.length > 0 &&
                          filter.Brand.includes(brand)
                        }
                        linethru={
                          filter.Brand.length > 0 &&
                          !filter.Brand.includes(brand)
                        }
                        small
                      >
                        {brand}
                        <CheckBox
                          type="checkbox"
                          onChange={evt => handleBrandChange(evt, brand)}
                        />
                      </CheckBoxLabel>
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
                      <CheckBoxLabel
                        isHighlighted={
                          filter.Color.length > 0 &&
                          filter.Color.includes(color)
                        }
                        key={`filterOption${key}${color}`}
                        linethru={
                          filter.Color.length > 0 &&
                          !filter.Color.includes(color)
                        }
                        small
                      >
                        {color}
                        <CheckBox
                          type="checkbox"
                          onChange={evt => handleColorChange(evt, color)}
                        />
                      </CheckBoxLabel>
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
                      <CheckBoxLabel
                        key={`filterOption${key}${size}`}
                        isHighlighted={
                          filter.Size.length > 0 && filter.Size.includes(size)
                        }
                        linethru={
                          filter.Size.length > 0 && !filter.Size.includes(size)
                        }
                        small
                      >
                        {size}
                        <CheckBox
                          type="checkbox"
                          onChange={evt => handleSizeChange(evt, size)}
                        />
                      </CheckBoxLabel>
                    ))}
                  </Column>
                </Padded>
              );
           
            default:
              return;
          }
        })}
      </OutlinedBox>
    </>
  );
};
