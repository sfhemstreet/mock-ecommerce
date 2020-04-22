import { FunctionComponent } from "react";
import useSWR from "swr";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import {
  KeyType as StoredType,
  MODAL,
  getModalsState,
} from "../../storage/storage";
import styled from "styled-components";
import { Contained } from "../Contained";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import { CloseIcon } from "../CloseIcon";
import { Txt } from "../Txt";


const TopRightModalChildrenContainer = styled.div<{
  width: string;
  height: string;
}>`
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

type TopRightModalSkeletonProps = {
  onClose: () => void;
  type: StoredType;
  title: string;
};

export const TopRightModalSkeleton: FunctionComponent<TopRightModalSkeletonProps> = ({
  children,
  title,
  type,
  onClose
}): JSX.Element => {
  const [width, height] = useWindowDimensions();
  const modals = useSWR(MODAL, getModalsState);

  return (
    <Contained width={"100%"} height={"100%"}>
      {/* Close Button */}
      <DisplayAtMedia tablet laptop desktop>
        <Positioned absolute top={"3px"} left={"3px"}>
          <CloseIcon onClick={onClose} />
        </Positioned>
      </DisplayAtMedia>

      {/* Mobile Close Button */}
      <DisplayAtMedia mobile>
        <Positioned
          absolute
          top={`${height - 100}px`}
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
        <Txt big bold alignCenter padding={"50px 0px 10px 0px"}>
          {title}
        </Txt>
      </DisplayAtMedia>

      {/* Children */}
      <DisplayAtMedia mobile>
        <TopRightModalChildrenContainer
          width={`${width - 4}px`}
          height={`${height - 245}px`}
        >
          {children}
        </TopRightModalChildrenContainer>
      </DisplayAtMedia>

      <DisplayAtMedia tablet laptop desktop>
        <TopRightModalChildrenContainer
          width={"100%"}
          height={"455px"}
        >
          {children}
        </TopRightModalChildrenContainer>
      </DisplayAtMedia>
    </Contained>
  );
};
