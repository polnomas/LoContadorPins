import { useState, useCallback, useEffect } from "react";
import ReactModal from "react-modal";
import ModalContext from "../contexts/ModalContext";
import "../styles/ModalProvider.css";

function ModalProvider({ children }) {
  const [modal, setModal] = useState({ isOpen: false, content: null });

  useEffect(() => {
    ReactModal.setAppElement("#root");
  }, []);

  const openModal = useCallback((content) => {
    setModal({ isOpen: true, content });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, content: null });
  }, []);

  const renderedContent =
    typeof modal.content === "function"
      ? modal.content({ closeModal })
      : modal.content;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ReactModal
        isOpen={modal.isOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
        style={{
          content: {
            position: "static",  
            inset: "unset",       
            padding: 0,
            border: "none",
            background: "transparent",
            overflow: "visible",
          },
        }}
      >
        {}
        <div className="modal-center">
          {renderedContent}
        </div>
      </ReactModal>
    </ModalContext.Provider>
  );
}

export default ModalProvider;
