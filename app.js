const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
const fetch = require("node-fetch");
const mongoose = require('mongoose');
var rateRouter = require('./routes/rates');
const csv = require('csvtojson');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

//database
require('./config/database');

//view engine 
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(__dirname + '/vendors'));
app.use('/rate', rateRouter);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tracking", function (req, res) {
    res.sendFile(path.join(__dirname, "pages/tracking.html"));
});

app.get("/port", function (req, res) {
    res.sendFile(path.join(__dirname, "pages/port.html"));
});

app.get('/api/cys', function(req, res){
    const csvFilePath = path.join(__dirname, 'public', 'db/port_with_bounds_url.csv');

    // Check if file exists
    if (!fs.existsSync(csvFilePath)) {
        console.error('CSV file not found');
        res.status(500).json({ error: 'CSV file not found' });
        return;
    }

    res.set('Cache-Control', 'no-store');  // disable caching

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            res.json(jsonObj);
        })
        .catch((err) => {
            console.error('Error converting CSV to JSON:', err);
            res.status(500).json({ error: 'An error occurred while converting CSV data to JSON' });
        });
});


app.get("/ports", function (req, res) {
  res.sendFile(path.join(__dirname, "pages/ports.html"));
});

app.get('/api/ports', function(req, res){
    const csv = require('csvtojson');
    const csvFilePath = path.join(__dirname, 'public', 'ports.csv');

    res.set('Cache-Control', 'no-store');  // disable caching

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            res.json(jsonObj);
        })
        .catch((err) => {
            res.status(500).json({ error: 'An error occurred while converting CSV data to JSON' });
        });
});

app.get("/vsl", function (req, res) {
  res.sendFile(path.join(__dirname, "pages/vessel.html"));
});


app.get('/api/vessel', function(req, res){
    const csv = require('csvtojson');
    const csvFilePath = path.join(__dirname, 'public', 'db/vessel.csv');

    res.set('Cache-Control', 'no-store');  // disable caching

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            res.json(jsonObj);
        })
        .catch((err) => {
            res.status(500).json({ error: 'An error occurred while converting CSV data to JSON' });
        });
});


// Define the /api/data endpoint
app.get("/api/data", (req, res) => {
  const url =
    "https://www.aishub.net/coverage.json?minLat=-13.41099&maxLat=54.26522&minLon=-274.04297&maxLon=302.87109&zoom=2&view=false&t=1684857267";
  const options = getOptions();

  fetchAPI(url, options, res);
});

const getOptions = () => {
  return {
    method: "GET",
    headers: {
      scheme: "https",
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "ko,en;q=0.9,en-US;q=0.8",
      dnt: "1",
      referer: "https://www.aishub.net/coverage",
      "sec-ch-ua":
        '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50",
      "x-requested-with": "XMLHttpRequest",
    },
  };
};

const fetchAPI = (url, options, res) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ error: "An error occurred while fetching data" })
    );
};

app.get("/api/stations/:id/realtime", (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/realtime.json`;
  const options = getOptions();

  fetchAPI(url, options, res);
});

app.get("/api/stations/:id/weekly-statistics", (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/weekly-statistics.json`;
  const options = getOptions();

  fetchAPI(url, options, res);
});

app.get("/api/stations/:id/monthly-statistics", (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/monthly-statistics.json`;
  const options = getOptions();

  fetchAPI(url, options, res);
});

app.get("/api/stations/:id/yearly-statistics", (req, res) => {
  const url = `https://www.aishub.net/station/${req.params.id}/yearly-statistics.json`;
  const options = getOptions();

  fetchAPI(url, options, res);
});

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});