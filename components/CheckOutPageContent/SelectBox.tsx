import styled from 'styled-components';
import { Transformed } from '../Transformed';
import { accessibleEnterKeyPress } from '../../util/accessibleEnterKeyPress';



const SelectBoxContainer = styled.label<{ isSelected: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  margin-left: 5px;

  border: solid 2px ${props => props.theme.colors.transparentBlack};

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease-in-out;

  cursor: pointer;

  background-color: ${props =>
    props.isSelected ? props.theme.colors.green : "#DDD"};
`;

const CheckMarkSVG = styled.svg`
  width: 20px;
  height: 20px;
`;

type SelectBoxProps = {
  label?: string;
  onClick: () => void;
  isSelected: boolean;
};

export const SelectBox = ({label, onClick, isSelected }: SelectBoxProps) => {
  return (
    <SelectBoxContainer
      isSelected={isSelected}
      onKeyPress={accessibleEnterKeyPress(onClick)}
      tabIndex={0}
      onClick={onClick}
      title={label ?? "Select option"}
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