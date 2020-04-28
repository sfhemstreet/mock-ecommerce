import styled, { css } from "styled-components";
import { Txt } from "../../Txt";
import { OutlinedBox } from "./OutlinedBox";
import { useState } from "react";
import { accessibleEnterKeyPress } from "../../../util/accessibleEnterKeyPress";

const SortOptionRadio = styled.input`
  display: none;
`;

const SortOptionLabel = styled.label<{ isHighlighted: boolean }>`
  display: inline-block;
  width: 161px;
  padding: 3px 4px;
  border-radius: 4px;
  cursor: pointer;

  ${props =>
    props.isHighlighted &&
    css `
      color: ${props => props.theme.colors.black};
      background-color: ${props => props.theme.colors.white};
    `}
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
      <OutlinedBox title="Sort Options">
        {options.map((option: string, index: number) => (
          <SortOptionLabel
            tabIndex={0}
            aria-label={`Sort products by ${option}`}
            key={`SortOption${index}`}
            isHighlighted={selectedIndex === index}
            onKeyPress={accessibleEnterKeyPress(() => handleClick(index))}
          >
            {option}
            <SortOptionRadio type="radio" onClick={evt => handleClick(index)} />
          </SortOptionLabel>
        ))}
      </OutlinedBox>
    </>
  );
};
