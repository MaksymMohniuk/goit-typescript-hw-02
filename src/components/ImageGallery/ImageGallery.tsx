import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Photo } from "../../../App";

interface ImageGalleryProps {
  photos: Photo[];
  onImageClick: (photo: Photo) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  photos,
  onImageClick,
}) => {
  return (
    <ul className={styles["image-gallery-container"]}>
      {Array.isArray(photos) &&
        photos.map((photo) => (
          <li key={photo.id} className={styles["image-gallery-item"]}>
           <ImageCard photo={photo} onImageClick={() => onImageClick(photo)} />
          </li>
        ))}
    </ul>
  );
};

export default ImageGallery;
