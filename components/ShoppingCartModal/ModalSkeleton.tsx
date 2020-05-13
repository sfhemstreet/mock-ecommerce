import { FunctionComponent } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import styled from "styled-components";
import { Contained } from "../Contained";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import { CloseIcon } from "../CloseIcon";
import { Txt } from "../Txt";

type ModalChildrenContainerProps = {
  width: string;
  height: string;
}

const ModalChildrenContainer = styled.div<ModalChildrenContainerProps>`
  width: ${props => props.width};
  height: ${props => props.height};

  display: flex;
  justify-content: center;
  position: relative;

  transition: all 0.5s ease-in;
`;

const MobileCloseButtonContainer = styled.div`
  width: 300px;
  height: 35px;
  border: solid 1px ${props => props.theme.colors.transparentWhite};

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.99;
  z-index: -1;
`;

type ModalSkeletonProps = {
  onClose: () => void;
  title: string;
};

export const ModalSkeleton: FunctionComponent<ModalSkeletonProps> = ({
  children,
  title,
  onClose
}): JSX.Element => {
  const [width, height] = useWindowDimensions();

  return (
    <Contained width={"100%"} height={"100%"}>
      {/* Close Button */}
      <DisplayAtMedia tablet laptop desktop>
        <Positioned absolute top={"6px"} left={"3px"}>
          <CloseIcon onClick={onClose} />
        </Positioned>
      </DisplayAtMedia>

      {/* Mobile Close Button */}
      <DisplayAtMedia mobile>
        <Positioned
          absolute
          top={`${height - 50}px`}
          left={`${(width - 300) / 2}px`}
          zIndex={30}
        >
          <MobileCloseButtonContainer
            tabIndex={0}
            onClick={onClose}
            onKeyPress={accessibleEnterKeyPress(onClose)}
          >
            <CloseIcon onClick={() => {}} />
          </MobileCloseButtonContainer>
        </Positioned>
      </DisplayAtMedia>

      {/* Title */}
      <DisplayAtMedia tablet laptop desktop>
        <Txt big bold alignCenter padding={"10px 0px 5px 0px"}>
          {title}
        </Txt>
      </DisplayAtMedia>

      <DisplayAtMedia mobile>
        <Txt big bold alignCenter padding={"20px 0px 10px 0px"}>
          {title}
        </Txt>
      </DisplayAtMedia>

      {/* Children */}
      <DisplayAtMedia mobile>
        <ModalChildrenContainer
          width={`${width - 4}px`}
          height={`${height - 120}px`}
        >
          {children}
        </ModalChildrenContainer>
      </DisplayAtMedia>

      <DisplayAtMedia tablet laptop desktop>
        <ModalChildrenContainer
          width={"100%"}
          height={"455px"}
        >
          {children}
        </ModalChildrenContainer>
      </DisplayAtMedia>
    </Contained>
  );
};
