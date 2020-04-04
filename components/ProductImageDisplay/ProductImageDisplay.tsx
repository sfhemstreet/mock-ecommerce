import styled from "styled-components";
import { Column } from "../Column";
import { Row } from "../Row";
import { useState } from "react";
import { mediaDevices } from "../DisplayAtMedia";

/* 
TODO:

- media queries for changing photo size
- arrows and swip action on main large photo
- correct layout for tablet and up screens

*/

const ProductImageDisplayContainer = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;

  @media ${mediaDevices.tablet} {
    flex-direction: row-reverse;
  }
`;

const AllThumbnails = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  overflow: scroll;

  @media ${mediaDevices.tablet} {
    flex-direction: column;
    width: 100px;
  }
`;

const ThumbnailImg = styled.img`
  width: 100px;
  height: auto;
`;

const ThumbnailContainer = styled.div<{ highlight: boolean }>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  border-style: solid;
  border-width: 3px;
  border-color: ${props =>
    props.highlight ? props.theme.colors.rose : "transparent"};
`;

const SelectedProductImg = styled.img`
  width: 100%;
  height: auto;
`;

type ProductImageDisplayProps = {
  photos: {
    url: string;
    name: string;
  }[];
  thumbnails: {
    url: string;
    name: string;
  }[];
};

export function ProductImageDisplay({
  photos,
  thumbnails
}: ProductImageDisplayProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <ProductImageDisplayContainer>
        <SelectedProductImg
          src={process.env.BACKEND_URL + photos[selectedIndex].url}
          alt={"Product Photo"}
        />
        <AllThumbnails>
          {thumbnails.map((thumb, index) => (
            <ThumbnailContainer
              key={thumb.url}
              highlight={index === selectedIndex}
            >
              <ThumbnailImg
                src={process.env.BACKEND_URL + thumb.url}
                alt={`${thumb.name} thumbnail`}
                onClick={() => setSelectedIndex(index)}
              />
            </ThumbnailContainer>
          ))}
        </AllThumbnails>
    </ProductImageDisplayContainer>
  );
}
