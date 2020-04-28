import styled from "styled-components";
import useSWR from "swr";
import { fetchQuery } from "../../util/fetchQuery";
import { SpinningLoader } from "../SpinningLoader";
import { Column } from "../Column";
import { Txt } from "../Txt";
import { Padded } from "../Padded";
import { mediaDevices } from "../DisplayAtMedia";
import Link from "next/link";

const SearchBoxResultsContainer = styled.div`
  width: 200px;
  max-height: 300px;

  padding-top: 10px;

  position: absolute;
  top: 42px;
  left: -7px;

  overflow-y: scroll;
  overflow-x: hidden;

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

  @media ${mediaDevices.tablet} {
    max-height: 500px;
  }
`;

const SearchResultItem = styled.a`
  text-decoration: none;

  width: 100%;
  height: auto;
  min-height: 30px;

  background-color: white;
  color: ${props => props.theme.colors.black};

  margin-top: 1px;

  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-areas: "image name";
  gap: 3px 3px;

  cursor: pointer;

  transition: all 0.3s ease-in-out;

  :hover {
    color: ${props => props.theme.colors.rose};
  }
`;

const TitleItem = styled.div`
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};

  font-weight: 500;
  padding: 4px;
`;

const ProdImg = styled.img`
  width: 60px;
  height: auto;
`;

const GridItem = styled.div<{ name: string }>`
  grid-area: ${props => props.name};
`;

type ProductResult = {
  id: string;
  slug: string;
  Name: string;
  Price: number;
  Discount: number;
  Brand: {
    Name: string;
  };
  Preview: {
    url: string;
  };
};

type BrandResult = {
  id: string;
  slug: string;
  Name: string;
  Logo: {
    url: string;
  };
};

type CategoryResult = {
  id: string;
  slug: string;
  Name: string;
};

type SearchResults = {
  products: ProductResult[];
  brands: BrandResult[];
  categories: CategoryResult[];
  subcategories: CategoryResult[];
};

type SearchBoxResultsProps = {
  text: string;
};

export function SearchBoxResults({ text }: SearchBoxResultsProps) {
  const SEARCH_QUERY = `
    {
      products(where: { Name_contains: "${text}" }) {
        id
        slug
        Name
        Price
        Discount
        Brand {
          Name
        }
        Preview {
          url
        }
      }
      brands(where: {Name_contains: "${text}" }) {
        id
        slug
        Name
        Logo {
          url
        }
      }
      categories(where: {Name_contains: "${text}"}) {
        id
        slug
        Name
      }
      subcategories(where: {Name_contains: "${text}"}) {
        id
        slug
        Name
      }
    }
  `;

  const fetchQueryHandler = async (query: string) => {
    const res = await fetchQuery(query);
    const { data } = await res.json();

    return data as SearchResults;
  };

  const queryResults = useSWR(SEARCH_QUERY, fetchQueryHandler);

  if (queryResults.data === undefined) return <SpinningLoader />;

  return (
    <SearchBoxResultsContainer>
      {/* PRODUCT RESULTS 1st */}
      {queryResults.data.products.length > 0 && (
        <TitleItem>
          <Txt alignCenter bold padding={"4px"}>
            Products
          </Txt>
        </TitleItem>
      )}
      {queryResults.data.products.map(item => (
        <Link
          href={`/product/${item.slug}`}
          key={`product-${item.id}-${Date.now()}`}
        >
          <SearchResultItem>
            <GridItem name={"image"}>
              <ProdImg
                src={process.env.BACKEND_URL + item.Preview.url}
                alt={`${item.Name} by ${item.Brand.Name}`}
              />
            </GridItem>
            <GridItem name={"name"}>
              <Column justifyCenter>
                <Txt small>{item.Brand.Name}</Txt>
                <Txt bold>{item.Name}</Txt>
              </Column>
            </GridItem>
          </SearchResultItem>
        </Link>
      ))}

      {/* BRAND RESULTS 2nd */}
      {queryResults.data.brands.length > 0 && (
        <TitleItem>
          <Txt alignCenter bold padding={"4px"}>
            Brands
          </Txt>
        </TitleItem>
      )}
      {queryResults.data.brands.map(item => (
        <Link
          href={`/brand/${item.slug}`}
          key={`brand-${item.id}-${Date.now()}`}
        >
          <SearchResultItem>
            <GridItem name={"image"}>
              <Column justifyCenter alignCenter>
                <ProdImg
                  src={process.env.BACKEND_URL + item.Logo.url}
                  alt={`${item.Name} logo`}
                />
              </Column>
            </GridItem>
            <GridItem name={"name"}>
              <Column justifyCenter alignCenter>
                <Txt>{item.Name}</Txt>
              </Column>
            </GridItem>
          </SearchResultItem>
        </Link>
      ))}

      {/* CATEGORY RESULTS 3rd */}
      {queryResults.data.categories.length > 0 && (
        <TitleItem>
          <Txt alignCenter bold padding={"4px"}>
            Categories
          </Txt>
        </TitleItem>
      )}
      {queryResults.data.categories.map(item => (
        <Link
          href={`/category/${item.slug}`}
          key={`category-${item.id}-${Date.now()}`}
        >
          <SearchResultItem>
            <Column justifyCenter>
              <Txt noWrap padding={"4px"}>
                {item.Name}
              </Txt>
            </Column>
          </SearchResultItem>
        </Link>
      ))}

      {/* SUBCATEGORY RESULTS 4th */}
      {queryResults.data.subcategories.length > 0 && (
        <TitleItem>
          <Txt noWrap alignCenter bold padding={"4px"}>
            Sub-Categories
          </Txt>
        </TitleItem>
      )}
      {queryResults.data.subcategories.map(item => (
        <Link
          href={`/products/${item.slug}`}
          key={`subcategory-${item.id}-${Date.now()}`}
        >
          <SearchResultItem>
            <Column justifyCenter>
              <Txt noWrap padding={"4px"}>
                {item.Name}
              </Txt>
            </Column>
          </SearchResultItem>
        </Link>
      ))}
    </SearchBoxResultsContainer>
  );
}
