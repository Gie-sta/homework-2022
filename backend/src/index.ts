import express from "express";
import cors from "cors";
import bodyParser = require("body-parser");

import data from "./data/smarty.json";

const app = express();

const allowedOrigins = ["http://localhost:3001", "http://localhost:3000"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

app.get("/autocomplete", (req, res) => {
    let matches;
    if (req.query.text) {
        matches = data.filter((entry) => {
            const regex = new RegExp(`\\b${req.query.text}[a-zA-Z]*`, "gi");
            const matchedPlaces = entry.displayname.match(regex);
            return matchedPlaces;
        });
        if (matches.length > 10) {
            matches.length = 10;
        }
    }
    res.send(matches);
});

app.listen(port, () => {
    console.log(`Backend server is listening on port ${port}.`);
});
