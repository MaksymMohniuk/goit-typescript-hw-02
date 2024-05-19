import { Photo } from "../../../App";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  photo: Photo;
  onImageClick: (photo: Photo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onImageClick }) => {
    const onClick = () => {
      onImageClick(photo); 
    };
  return (
    <div className={styles["image-card-container"]}>
      <img
        className={styles["image-card-image"]}
        width={250}
        onClick={onClick}
        src={photo.urls.small}
        alt={photo.description || ''}
      />
      <h2 className={styles["image-card-description"]}>
        Description: {photo.description}
      </h2>
      <p className={styles["image-card-likes"]}>
        Likes: <b>{photo.likes}</b>
      </p>
    </div>
  );
};

export default ImageCard;
