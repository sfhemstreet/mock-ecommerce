import { FunctionComponent } from "react";
import useSWR from "swr";
import {
  KeyType as StoredType,
  MODAL,
  getModalsState,
  WISHLIST,
  SHOPPING_CART
} from "../../storage/storage";
import styled from "styled-components";
import { Contained } from "../Contained";
import { DisplayAtMedia } from "../DisplayAtMedia";
import { Positioned } from "../Positioned";
import { CloseIcon } from "../CloseIcon";
import { Txt } from "../Txt";
import { Row } from "../Row";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { accessibleEnterKeyPress } from "../../util/accessibleEnterKeyPress";
import { SubmitButton } from "./SubmitButton";
import { Transition } from "react-transition-group";
import { ENTERED } from "react-transition-group/Transition";

const TopRightModalChildrenContainer = styled.div<{
  width: string;
  height: string;
}>`
  width: ${props => props.width};
  height: ${props => props.height};

  overflow: scroll;

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
  opacity: .99;
  z-index: -1;
`;

const SlideIn = styled(Positioned)`
  transition: all 300ms ease-in-out;
`;

type TopRightModalSkeletonProps = {
  onClose: () => void;
  type: StoredType;
  title: string;
  submitButtonText: string;
  hasData: boolean;
};

export const TopRightModalSkeleton: FunctionComponent<TopRightModalSkeletonProps> = ({
  children,
  title,
  type,
  submitButtonText,
  hasData,
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
          fixed
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
        <TopRightModalChildrenContainer width={"100%"} height={"400px"}>
          {children}
        </TopRightModalChildrenContainer>
      </DisplayAtMedia>

      {/* Submit Button */}
      <Transition
        in={
          hasData &&
          !((modals.data &&
            type === WISHLIST &&
            modals.data.wishlist.isEditting) ||
            (modals.data &&
              type === SHOPPING_CART &&
              modals.data.shoppingCart.isEditting))
        }
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <>
            {/* Mobile Position Button in bottom middle above close button. */}
            <DisplayAtMedia mobile>
              <SlideIn
                absolute
                top={`${height - 150}px`}
                left={state === ENTERED ? `${(width - 300) / 2}px` : "500px"}
              >
                <SubmitButton isSubmit>{submitButtonText}</SubmitButton>
              </SlideIn>
            </DisplayAtMedia>

            {/* Position Button in bottom middle. 410 is width of parent, 120 is buttonSize */}
            <DisplayAtMedia tablet laptop desktop>
              <SlideIn
                relative
                bottom={`-8px`}
                left={state === ENTERED ? `${(410 - 300) / 2}px` : "410px"}
              >
                <SubmitButton isSubmit>{submitButtonText}</SubmitButton>
              </SlideIn>
            </DisplayAtMedia>
          </>
        )}
      </Transition>
    </Contained>
  );
};
