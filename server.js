const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");

const app = express();

const items = require("./routes/api/items");
app.use(cors());
app.use(bodyParser.json());

const db = require('./config/db');


app.use('/api/items', items);

//Serve static assets if in production
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port :: ${port}`));