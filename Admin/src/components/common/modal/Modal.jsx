import React, { useRef, useEffect } from "react";

const Modal = ({ modalshow, setModalShow, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    // Add event listener to close modal on outside click
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleModal();
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleModal = () => {
    setModalShow(false);
  };

  return (
    <div className={`modal ${modalshow ? "show" : "hide"}`}>
      <div className="w-auto">
        <div className="modal-content" ref={modalRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
