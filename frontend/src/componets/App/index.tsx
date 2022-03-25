import React from "react";
import Autocomplete from "../Autocomplete";

import styles from "./styles.module.scss";

const App = () => {
    return (
        <div className={styles.container}>
            <h1>Compare rental car deals to find the right one.</h1>
            <Autocomplete />
        </div>
    );
};

export default App;
