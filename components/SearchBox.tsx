import styled from "styled-components";
import { ChangeEvent, useRef } from "react";
import { Row } from "./Row";
import { SearchIcon } from "./SearchIcon";

const SearchBoxContainer = styled.div`
  height: 30px;
  width: auto;

  padding: 10px;

  display: flex;
  align-items: center;
`;

const SearchBoxInput = styled.input<{ isActive: boolean }>`
  padding: 5px;
  border: none;
  border-bottom: ${props =>
    props.isActive ? `1px solid ${props.theme.colors.white}` : "none"};

  background: none;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.typography.fontSize};

  width: ${props => (props.isActive ? "200px" : "0px")};
  transition: all 0.5s ease-out;
`;

type SearchBoxProps = {
  isActive: boolean;
  onActiveClick: () => void;
  text: string;
  onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBox = ({
  isActive,
  onActiveClick,
  text,
  onTextChange
}: SearchBoxProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  if (inputRef && inputRef.current && isActive) {
    inputRef.current.focus();
  }

  if (inputRef && inputRef.current && !isActive) {
    inputRef.current.blur();
  }

  return (
    <SearchBoxContainer>
      <Row alignCenter justifyEvenly>
        <SearchIcon onClick={onActiveClick} />
        <SearchBoxInput
          isActive={isActive}
          type="text"
          value={text}
          onChange={onTextChange}
          placeholder="Search"
          ref={inputRef}
        />
      </Row>
    </SearchBoxContainer>
  );
};
