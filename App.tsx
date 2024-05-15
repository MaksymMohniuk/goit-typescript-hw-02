import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Loader from "./src/components/Loader/Loader";
import ErrorMessage from "./src/components/ErrorMessage/ErrorMessage";
import SearchBar from "./src/components/SearchBar/SearchBar";
import { requestContentByQuery } from "./src/services/api";
import LoadMoreBtn from "./src/components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./src/components/ImageGallery/ImageGallery";
import ImageModal from "./src/components/ImageModal/ImageModal";

Modal.setAppElement("#root");

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  let subtitle;

  useEffect(() => {
    if (!query.length) return;
    async function fetchContentByQuery() {
      try {
        setIsLoading(true);
        const data = await requestContentByQuery(query, page);
        if (page > 1) {
          setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
        } else {
          setPhotos(data.results);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContentByQuery();
  }, [query, page]);

  const onSetSearchQuery = (searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsOpen(true);
  };

  function afterOpenModal() {
    subtitle.style.color = "rgba(0, 0, 0, 0.8)";
  }

  const closeModal = () => {
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