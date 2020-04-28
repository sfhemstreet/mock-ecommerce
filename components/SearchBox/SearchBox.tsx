import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { Row } from "../Row";
import { SearchIcon, FadeContainer } from "./SearchIcon";
import { Centered } from "../Centered";
import { SearchBoxResults } from "./SearchBoxResults";
import { Transition } from "react-transition-group";
import { TransitionStatus, ENTERED } from "react-transition-group/Transition";

const SearchBoxContainer = styled.div`
  height: 30px;
  width: 184px;

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

  width: ${props => (props.isActive ? "160px" : "0px")};
  transition: all 0.5s ease-out;

  pointer-events: ${props => (props.isActive ? "auto" : "none")};
`;



type SearchBoxProps = {
  isActive: boolean;
  onActiveClick: () => void;
  focusOnActive?: boolean;
};

export const SearchBox = ({
  isActive,
  onActiveClick,
  focusOnActive = true
}: SearchBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchText, setSearchText] = useState("");

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
        <Centered padding={"5px 10px 0px 10px"}>
          <SearchIcon onClick={onActiveClick} isActive={isActive} />
        </Centered>
        <label title="Search site for products, brands, and categories.">
          <SearchBoxInput
            isActive={isActive}
            type="text"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search"
            ref={inputRef}
          />  
        </label>
      </Row>
      <Transition
        in={isActive && searchText.trim().length > 1}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <FadeContainer state={state}>
            <SearchBoxResults text={searchText} />
          </FadeContainer>
        )}
      </Transition>
    </SearchBoxContainer>
  );
};
