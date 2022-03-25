import React, { useCallback, useEffect, useState } from "react";
import AutocompleteBox from "../AutocompleteInputBox";
import ModalComponent from "../Modal";
import { CgSearch } from "react-icons/cg";

import styles from "./styles.module.scss";

const Autocomplete = () => {
    const [select, setSelect] = useState("same");
    const [errorDialog, setErrorDialog] = useState(true);
    const [errorDialogSecond, setErrorDialogSecond] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [selectedDropOf, setSelectedDropOf] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalText, setModalText] = useState("");

    const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(event?.target.value);
    };

    const checkErrors = useCallback(() => {
        if (select === "same") {
            console.log("checkin errors)");
            setErrorDialogSecond(false);
            console.log(selectedDestination.length);
            selectedDestination.length === 0
                ? setErrorDialog(true)
                : setErrorDialog(false);
        } else {
            selectedDestination.length === 0
                ? setErrorDialog(true)
                : setErrorDialog(false);
            selectedDropOf.length === 0
                ? setErrorDialogSecond(true)
                : setErrorDialogSecond(false);
        }
    }, [
        setErrorDialog,
        setErrorDialogSecond,
        selectedDestination,
        selectedDropOf,
        select,
    ]);

    const handleFindClick = () => {
        checkErrors();
        setIsOpen(true);
    };

    useEffect(() => {
        const modalData = () => {
            if (errorDialog || errorDialogSecond) {
                console.log("error");
                setModalHeader(
                    "An error occurred while trying to perform your search"
                );
            } else {
                console.log("success");
                setModalHeader("Success!!");
            }
            if (errorDialog) {
                setModalText("Please pick a pick-up location.");
            } else if (!errorDialog && errorDialogSecond) {
                setModalText("Please pick a drop-off location.");
            } else setModalText("");
        };
        modalData();
    }, [errorDialog, errorDialogSecond]);

    return (
        <div className={styles.container}>
            <select
                onChange={(event) => selectHandler(event)}
                value={select}
                className={styles.select}
            >
                <option value="same" className={styles.option}>
                    Same drop-off
                </option>
                <option value="dif" className={styles.option}>
                    Different drop-off
                </option>
            </select>
            <div className={styles.search_group}>
                <div className={styles.input_container}>
                    <AutocompleteBox
                        destination={"From?"}
                        setSelectedLocation={setSelectedDestination}
                        select={select}
                    />
                    {select === "dif" && (
                        <AutocompleteBox
                            destination={"To?"}
                            setSelectedLocation={setSelectedDropOf}
                            select={select}
                        />
                    )}
                </div>
                <div onClick={handleFindClick} className={styles.btn}>
                    <CgSearch
                        style={{ height: 19.2, width: 19.2, color: "#fff" }}
                    />
                </div>
            </div>
            <ModalComponent
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                modalHeader={modalHeader}
                modalText={modalText}
            />
        </div>
    );
};

export default Autocomplete;
