import styled from "styled-components";
import { Txt } from "../Txt";
import { OutlinedBox } from "./OutlinedBox";
import { useState } from "react";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";

const Point = styled.div`
  cursor: pointer;
`;

const HighlightedItem = styled(Txt)`
  padding: 3px;
  color: ${props => props.theme.colors.black};
  background-color: ${props => props.theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
`;

type SortBoxProps = {
  onSelect: (option: string) => void;
  options: string[];
};

export const SortBox = ({ onSelect, options }: SortBoxProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onSelect(options[index]);
  };

  return (
    <>
      <Txt bold>Sort</Txt>
      <OutlinedBox>
        {options.map((option, index) =>
          index === selectedIndex ? (
            <HighlightedItem
              onClick={() => handleClick(index)}
              onKeyPress={accessibleEnterKeyPress(() => handleClick(index))}
              tabIndex={0}
              key={`SortOption${option}${index}`}
            >
              {option}
            </HighlightedItem>
          ) : (
            <Point
              onClick={() => handleClick(index)}
              onKeyPress={accessibleEnterKeyPress(() => handleClick(index))}
              tabIndex={0}
              key={`SortOption${option}${index}`}
            >
              <Txt padding={"3px"}>{option}</Txt>
            </Point>
          )
        )}
      </OutlinedBox>
    </>
  );
};
