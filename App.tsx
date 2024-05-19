
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal"; 
import Loader from "./src/components/Loader/Loader";
import ErrorMessage from "./src/components/ErrorMessage/ErrorMessage";
import SearchBar from "./src/components/SearchBar/SearchBar";
import { requestContentByQuery } from "./src/services/api";
import LoadMoreBtn from "./src/components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./src/components/ImageGallery/ImageGallery";
import ImageModal from "./src/components/ImageModal/ImageModal";

Modal.setAppElement("#root");

export interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  description: string;
  likes: number;
}

const App = () => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.length) return;
    async function fetchContentByQuery() {
      try {
        setIsLoading(true);
        const response = await requestContentByQuery(query, page);
        const data = response.data;
        if (page > 1) {
          setPhotos((prevPhotos) => [...(prevPhotos || []), ...data]);
        } else {
          setPhotos(data);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContentByQuery();
  }, [query, page]);

  const onSetSearchQuery = (searchTerm: string): void => {
    setQuery(searchTerm);
    setPage(1);
  };

  const loadMore = () : void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (photo : Photo) : void => {
    setSelectedPhoto(photo);
    setIsOpen(true);
  };

  function afterOpenModal() : void {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "rgba(0, 0, 0, 0.8)";
    }
  }

  const closeModal = () : void => {
    setIsOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSetSearchQuery={onSetSearchQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {photos && <ImageGallery photos={photos} onImageClick={openModal} />}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          afterOpenModal={afterOpenModal}
          modalData={selectedPhoto}
          closeModal={closeModal}
        />
      )}
      {photos && photos.length > 0 && <LoadMoreBtn loadMore={loadMore} />}
    </>
  );
};

export default App;