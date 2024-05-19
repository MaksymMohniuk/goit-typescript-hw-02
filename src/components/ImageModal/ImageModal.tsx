import Modal from "react-modal";
import { Photo } from "../../../App";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface ImageModalProps {
  modalData: Photo | null;
  modalIsOpen: boolean;
  closeModal: () => void;
  afterOpenModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ modalData, modalIsOpen, closeModal, afterOpenModal }) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div>
          <button onClick={closeModal}>Close Modal</button>
          {modalData && (
            <img width={500} src={modalData.urls.regular} alt={modalData.description} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
