import { FunctionComponent } from "react";
import styled from "styled-components";
import { Contained } from "../Contained";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import { CloseIcon } from "../CloseIcon";
import { Txt } from "../Txt";
import { Row } from "../Row";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";

const TopRightModalChildrenContainer = styled.div<{width: string, height: string}>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  position: relative;
`;

const MobileCloseButtonContainer = styled.div`
  width: 300px;
  height: 35px;
  border: solid 1px ${props => props.theme.colors.transparentWhite};

  display: flex;
  justify-content: center;
  align-items: center;
`;

type TopRightModalSkeletonProps = {
  onClose: () => void;
  title: string;
};

export const TopRightModalSkeleton: FunctionComponent<TopRightModalSkeletonProps> = ({
  children,
  title,
  onClose
}): JSX.Element => {
  const [width, height] = useWindowDimensions();

  return (
    <Contained width={"100%"} height={"100%"}>
      <DisplayAtMedia tablet laptop desktop>
        <Positioned absolute top={"3px"} left={"3px"}>
          <CloseIcon onClick={onClose} />
        </Positioned>
      </DisplayAtMedia>
      <DisplayAtMedia tablet laptop desktop>
        <Txt big bold alignCenter padding={"10px 0px 6px 0px"}>
          {title}
        </Txt>
      </DisplayAtMedia>
      <DisplayAtMedia mobile>
        <Txt big bold alignCenter padding={"40px 0px 20px 0px"}>
          {title}
        </Txt>
      </DisplayAtMedia>
      <DisplayAtMedia mobile>
        <TopRightModalChildrenContainer width={`${width - 4}px`} height={`${(height - 210 )}px`}>
          {children}
        </TopRightModalChildrenContainer>  
      </DisplayAtMedia>
      <DisplayAtMedia tablet laptop desktop>
        <TopRightModalChildrenContainer width={"100%"} height={'450px'}>
          {children}
        </TopRightModalChildrenContainer> 
      </DisplayAtMedia>
      
      <DisplayAtMedia mobile>
        <Positioned
          absolute
          top={`${height - 100}px`}
          left={`${(width - 300) / 2}px`}
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
    </Contained>
  );
};
