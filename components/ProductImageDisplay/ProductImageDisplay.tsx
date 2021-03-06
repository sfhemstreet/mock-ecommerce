import { useState } from "react";
import { ProductImageDisplayContainer } from "./components/ProductImageDisplayContainer";
import { SelectedProductImg } from "./components/SelectedProductImg";
import { ThumbnailsContainer } from "./components/ThumbnailsContainer";
import { Thumbnail } from "./components/Thumbnail";
import { ThumbnailImg } from "./components/ThumbnailImg";
import { SelectedPhotoModalBackground } from "./components/SelectedPhotoModalBackground";
import { SelectedPhotoModal } from "./components/SelectedPhotoModal";

type ProductImageDisplayProps = {
  photos: {
    url: string;
    name: string;
  }[];
  thumbnails: {
    url: string;
    name: string;
  }[];
  photosWebP?: {
    url: string;
    name: string;
  }[];
  thumbnailsWebP?: {
    url: string;
    name: string;
  }[];
};

export function ProductImageDisplay({
  photos,
  thumbnails,
  photosWebP,
  thumbnailsWebP
}: ProductImageDisplayProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <ProductImageDisplayContainer>
      <picture>
        {photosWebP && (
          <source type="image/webp" srcSet={process.env.BACKEND_URL + photosWebP[selectedIndex].url} />
        )}
        <SelectedProductImg
          src={process.env.BACKEND_URL + photos[selectedIndex].url}
          alt={"Product Photo"}
          onClick={() => setIsZoomed(true)}
        />  
      </picture>
      
      {thumbnails.length > 1 && (
        <ThumbnailsContainer>
          {thumbnails.map((thumb, index) => (
            <Thumbnail
              key={thumb.url}
              highlight={index === selectedIndex}
            >
              <picture>
                {thumbnailsWebP && (
                  <source type="image/webp" srcSet={process.env.BACKEND_URL + thumbnailsWebP[index].url} />
                )}
                <ThumbnailImg
                  src={process.env.BACKEND_URL + thumb.url}
                  alt={`${thumb.name} thumbnail`}
                  onClick={() => setSelectedIndex(index)}
                />  
              </picture>
              
            </Thumbnail>
          ))}
        </ThumbnailsContainer>
      )}
      {isZoomed && (
        <SelectedPhotoModalBackground onClick={() => setIsZoomed(false)}>
          <SelectedPhotoModal
            src={process.env.BACKEND_URL + photos[selectedIndex].url}
            alt={"Full Size Product Image"}
          />
        </SelectedPhotoModalBackground>
      )}
    </ProductImageDisplayContainer>
  );
}
