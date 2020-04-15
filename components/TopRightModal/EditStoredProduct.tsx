import styled from 'styled-components';
import { StoredProduct } from '../../storage/types';
import { Row } from '../Row';
import { Padded } from '../Padded';
import { accessibleEnterKeyPress } from '../../util/accessibleEnterKeyPress';

const EditStoredProductContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const EditStoredProductButton = styled.button<{ isSubmit?: boolean }>`
  border: solid 1px ${props => props.theme.colors.transparentWhite};
  background: ${props => props.isSubmit ? props.theme.colors.green : "transparent"};
  color: ${props => props.theme.colors.white};
  width: 100px;
  height: 40px;
`;

type EditStoredProductProps = {
  item: StoredProduct | null;
  onCancel: () => void
}

export const EditStoredProduct = ({item, onCancel}: EditStoredProductProps) => {

  // TODO 
  // add SWR to this page to fetch product info
  // to fetch and display all options available 
  // on product so user can edit 

  //const productData = useSWR()

  return (
    <EditStoredProductContainer>

      <Padded padding={"10px"}>
        <Row justifyEvenly>
          <EditStoredProductButton onClick={onCancel} onKeyPress={accessibleEnterKeyPress(onCancel)}>
            Cancel
          </EditStoredProductButton> 
          <EditStoredProductButton isSubmit>
            Submit
          </EditStoredProductButton> 
        </Row>
      </Padded>
    </EditStoredProductContainer>
  );
}