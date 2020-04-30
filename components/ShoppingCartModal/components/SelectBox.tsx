import styled from 'styled-components';
import { accessibleEnterKeyPress } from '../../../util/accessibleEnterKeyPress';
import { Transformed } from '../../Transformed';

const SelectBoxContainer = styled.label<{ isSelected: boolean }>`
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 2px;
  margin-left: 5px;

  border: solid 2px ${props => props.theme.colors.transparentBlack};

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease-in-out;

  background-color: ${props =>
    props.isSelected ? props.theme.colors.green : "#DDD"};
`;

const CheckMarkSVG = styled.svg`
  width: 30px;
  height: 30px;
`;

type SelectBoxProps = {
  onClick: () => void;
  isSelected: boolean;
};

export const SelectBox = ({ onClick, isSelected }: SelectBoxProps) => {
  return (
    <SelectBoxContainer
      isSelected={isSelected}
      onKeyPress={accessibleEnterKeyPress(onClick)}
      tabIndex={0}
      onClick={onClick}
      title={"Select to add to Shopping Cart"}
    >
      <Transformed
        isTransformed={!isSelected}
        transform={``}
        transition={"all 0.3s ease-in-out"}
        willFade
      >
        <CheckMarkSVG
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </CheckMarkSVG>
      </Transformed>
    </SelectBoxContainer>
  );
};