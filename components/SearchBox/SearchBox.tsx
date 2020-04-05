import styled from "styled-components";
import { ChangeEvent, useRef, useEffect, useState } from "react";
import { Row } from "../Row";
import { SearchIcon } from "./SearchIcon";
import { Padded } from "../Padded";
import { Centered } from "../Centered";
import { SearchBoxData } from "../../queries/getSearchBoxData";
import { SearchBoxResults } from "./SearchBoxResults";


const SearchBoxContainer = styled.div`
  height: 30px;
  width: 164px;

  padding: 10px;

  display: flex;
  align-items: center;

  position: relative;
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
  data: SearchBoxData,
  isActive: boolean;
  onActiveClick: () => void;
  focusOnActive?: boolean;
};

export const SearchBox = ({
  data,
  isActive,
  onActiveClick,
  focusOnActive = true,
}: SearchBoxProps) => {

  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current && focusOnActive && isActive) {
      inputRef.current.focus();
    } else if (inputRef && inputRef.current && !isActive) {
      inputRef.current.blur();
    }
  }, [isActive]);


  
  return (
    <SearchBoxContainer>
      <Row alignCenter justifyEnd>
        <Centered padding={"0px 10px"}>
          <SearchIcon onClick={onActiveClick} />
        </Centered>
        <SearchBoxInput
          isActive={isActive}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          ref={inputRef}
        />
      </Row>
      {isActive && (
        <SearchBoxResults data={data} text={searchText}/>
      )}
    </SearchBoxContainer>
  );
};
