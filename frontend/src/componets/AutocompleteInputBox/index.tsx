import React, { useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { AiFillCar } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { MdLocalAirport } from "react-icons/md";

import { url } from "../../Api/api";
import { Place } from "../../types/types";
import styles from "./styles.module.scss";

type Props = {
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
    destination: string;
    select: string;
};

const AutocompleteBox = ({
    setSelectedLocation,
    destination,
    select,
}: Props) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [text, setText] = useState("");
    const [inputStage, setInputStage] = useState(styles.close);

    const getMatches = debounce(async (text: string) => {
        try {
            const response = await axios.get(url, { params: { text: text } });
            const placesArray: Place[] = response.data;
            setPlaces(placesArray);
        } catch (err) {
            console.log(err);
        }
    }, 500);

    const handleInputChange = (text: string) => {
        setText(text);
        getMatches(text);
        setSelectedLocation(text);
        if (text === "") {
            setSelectedLocation("");
        }
        if (places.length === 0) {
            setSelectedLocation("");
        }
    };

    const handleSuggestClick = (text: string) => {
        setText(text);
        setSelectedLocation(text);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setInputStage(styles.close);
        }, 100);
    };

    const inputStyle = () => {
        if (select === "same") {
            return styles.sameDropOf;
        } else return "";
    };

    const handleInputClick = () => {
        setInputStage(styles.open);
    };

    const zIndexDefine = () => {
        if (inputStage === styles.open) {
            return 10;
        } else return 0;
    };

    return (
        <div className={styles.autocompleteBox}>
            <div className={`${styles.input_container} ${inputStyle()}`}>
                <AiFillCar
                    style={{
                        position: "absolute",
                        marginTop: 18,
                        marginLeft: 16,
                        zIndex: zIndexDefine(),
                    }}
                />
                <input
                    className={`${
                        styles.inputBox
                    } ${inputStage} ${inputStyle()}`}
                    type="text"
                    name="text"
                    placeholder={destination}
                    value={text}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onBlur={handleBlur}
                    onClick={handleInputClick}
                />
            </div>

            <div className={styles.places_container}>
                {places.length !== 0 && (
                    <div className={`${styles.places} ${inputStage}`}>
                        <p className={styles.placeCategory}>
                            Cities (including airports)
                        </p>
                        {places.map(
                            (place: Place, i) =>
                                place.loctype === "city" && (
                                    <div className={styles.dropdown}>
                                        <FaCity className={styles.icon} />
                                        <div
                                            key={i}
                                            onClick={() =>
                                                handleSuggestClick(
                                                    place.displayname
                                                )
                                            }
                                        >
                                            <p className={styles.name}>
                                                {place.displayname}
                                            </p>
                                            <p className={styles.country}>
                                                {place.country}
                                            </p>
                                        </div>
                                    </div>
                                )
                        )}
                        <p className={styles.placeCategory}>Airports </p>
                        {places.map(
                            (place: Place, i) =>
                                place.loctype === "ap" && (
                                    <div
                                        className={styles.dropdown}
                                        onClick={() =>
                                            handleSuggestClick(
                                                place.displayname
                                            )
                                        }
                                    >
                                        <MdLocalAirport
                                            className={styles.icon}
                                        />
                                        <div key={i}>
                                            <p className={styles.name}>
                                                {place.airportname}
                                            </p>
                                            <p className={styles.country}>
                                                {place.cityname}
                                            </p>
                                        </div>
                                        <div className={styles.airport}>
                                            {place.ap}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutocompleteBox;
