import styled from "styled-components";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { SwitchTransition } from "react-transition-group";
import Transition, {
  TransitionStatus,
  ENTERED
} from "react-transition-group/Transition";

const SearchIconSVG = styled.svg<{ moveDown?: boolean }>`
  fill: ${props => props.theme.colors.white};
  transition: fill 0.3s ease-in-out;
  cursor: pointer;

  padding-top: ${props => (props.moveDown ? "6px" : "0px")};

  :hover {
    fill: ${props => props.theme.colors.rose};
  }
`;

export const FadeContainer = styled.div<{ state: TransitionStatus }>`
  opacity: ${props => (props.state === ENTERED ? 1 : 0)};
  transition: all 0.2s ease-in-out;
`;

type SearchIconProps = {
  onClick: () => void;
  isActive: boolean;
};

export const SearchIcon = ({ onClick, isActive }: SearchIconProps) => {
  return (
    <SwitchTransition mode={"out-in"}>
      <Transition
        key={!isActive ? "Open" : "Close"}
        timeout={{
          enter: 10,
          exit: 310
        }}
      >
        {state => (
          <FadeContainer state={state}>
            {!isActive ? (
              <SearchIconSVG
                onClick={onClick}
                onKeyPress={accessibleEnterKeyPress(onClick)}
                tabIndex={0}
                role="button"
                aria-label="Open Search Input"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </SearchIconSVG>
            ) : (
              <SearchIconSVG
                moveDown
                onClick={onClick}
                onKeyPress={accessibleEnterKeyPress(onClick)}
                tabIndex={0}
                role="button"
                aria-label="Close Search Input"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </SearchIconSVG>
            )}
          </FadeContainer>
        )}
      </Transition>
    </SwitchTransition>
  );
};
