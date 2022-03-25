import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";
import styles from "./styles.module.scss";

const customStyles = {
    content: {
        top: "20%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "466px",
        borderRadius: "10px",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
    overlay: {
        backgroundColor: "rgba(108, 122, 137, 0.75)",
    },
};

Modal.setAppElement("#root");

type Props = {
    modalIsOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalHeader: string;
    modalText: string;
};
const ModalComponent = ({
    modalIsOpen,
    setIsOpen,
    modalHeader,
    modalText,
}: Props) => {
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={styles.container}>
                    <MdClose className={styles.close} onClick={closeModal} />
                    <h2 className={styles.header}>{modalHeader}</h2>
                    {modalText !== "" && (
                        <div className={styles.text}>{modalText}</div>
                    )}

                    <button className={styles.btn} onClick={closeModal}>
                        Dismiss
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalComponent;
