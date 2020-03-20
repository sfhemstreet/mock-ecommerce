import styled from "styled-components";
import { ChangeEvent, useRef } from "react";
import { Row } from "./Row";
import { SearchIcon } from "./SearchIcon";
import { Padded } from "./Padded";
import { Centered } from "./Centered";

const SearchBoxContainer = styled.div`
  height: 30px;
  width: 164px;

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

  width: ${props => (props.isActive ? "130px" : "0px")};
  transition: all 0.5s ease-out;

  pointer-events:  ${props => (props.isActive ? "auto" : "none")};
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
  } else if (inputRef && inputRef.current && !isActive) {
    inputRef.current.blur();
  }

  return (
    <SearchBoxContainer>
      <Row alignCenter justifyEnd>
        <Centered padding={"0px 10px"}>
          <SearchIcon onClick={onActiveClick} />
        </Centered>
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
