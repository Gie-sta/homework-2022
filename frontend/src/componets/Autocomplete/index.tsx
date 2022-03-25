import React, { useCallback, useEffect, useState } from "react";
import AutocompleteBox from "../AutocompleteInputBox";
import ModalComponent from "../Modal";
import { CgSearch } from "react-icons/cg";
import Select, { StylesConfig } from "react-select";

import styles from "./styles.module.scss";

type OptionType = {
    label: string;
    value: string;
};

const customStyles: StylesConfig<OptionType, false> = {
    menu: (provided) => ({
        ...provided,
        width: 260,
        top: -7,
    }),
    option: (provided, state) => ({
        ...provided,
        color: "black",
        fontSize: 14,
        fontWeight: state.isSelected ? "bold" : "normal",
        backgroundColor: state.isSelected ? "#f0f3f5" : "#fff",
        cursor: "pointer",
        padding: 20,
        "&:hover": {
            backgroundColor: "#f0f3f5",
        },
    }),
    control: (provided) => ({
        ...provided,
        width: 165,
        border: "none",
        marginBottom: 10,
        cursor: "pointer",
        fontSize: 14,
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#212a30",
        "&:hover": {
            color: "#212a30",
        },
    }),
};

const Autocomplete = () => {
    const options = [
        { value: "same", label: "Same drop-off" },
        { value: "dif", label: "Different drop-off" },
    ];

    const [select, setSelect] = useState({
        value: "same",
        label: "Same drop-off",
    });
    const [errorDialog, setErrorDialog] = useState(true);
    const [errorDialogSecond, setErrorDialogSecond] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [selectedDropOf, setSelectedDropOf] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalText, setModalText] = useState("");

    const selectHandler = (
        obj: {
            value: string;
            label: string;
        } | null
    ) => obj && setSelect(obj);

    const checkErrors = useCallback(() => {
        if (select.value === "same") {
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
            <Select
                value={select}
                onChange={(option) => selectHandler(option)}
                defaultValue={options[0]}
                options={options}
                styles={customStyles}
                components={{
                    IndicatorSeparator: () => null,
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: "#f0f3f5",
                        primary: "#f0f3f5",
                    },
                })}
            />

            <div className={styles.search_group}>
                <div className={styles.input_container}>
                    <AutocompleteBox
                        destination={"From?"}
                        setSelectedLocation={setSelectedDestination}
                        select={select.value}
                    />
                    {select.value === "dif" && (
                        <AutocompleteBox
                            destination={"To?"}
                            setSelectedLocation={setSelectedDropOf}
                            select={select.value}
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
