import styled from "styled-components";
import { SearchBoxData } from "../../queries/getSearchBoxData";

const SearchBoxResultsContainer = styled.div`
  width: 138px;
  height: auto;

  padding-top: 6px;

  position: absolute;
  top: 40px;
  left: 34px;

  background-color: ${props => props.theme.colors.black};

  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: ${props => props.theme.colors.white};

  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: ${props => props.theme.colors.white};

  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.white};

  z-index: ${props => props.theme.zIndexes.searchBoxResults};
`;

const SearchResultItem = styled.div`
  width: 100%;
  height: 30px;

  background-color: ${props => props.theme.colors.black};

  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.transparentWhite};
`;

const SEARCH_BOX_HISTORY = "SEARCH_BOX_HISTORY";

type SearchResult = {
  id: number;
  Name: string;
  type: string;
};

type SearchBoxResultsProps = {
  data: SearchBoxData;
  text: string;
};

export function SearchBoxResults({ data, text }: SearchBoxResultsProps) {
  // check for local storage
  // show past history if text is ""
  // show relevant history if matches text

  // check if text matches
  // category
  // subcategory
  // product name
  // brand name

  let results = new Array<SearchResult>();

  if (typeof window !== "undefined" && window && window.localStorage) {
    const past = localStorage.getItem(SEARCH_BOX_HISTORY);
    if (past) {
      
    }
  }

  return (
    <>
      {results.length > 0 && (
        <SearchBoxResultsContainer>
          {results.map(item => (
            <SearchResultItem>
              
            </SearchResultItem>
          ))}
        </SearchBoxResultsContainer>
      )}
    </>
  );
}
