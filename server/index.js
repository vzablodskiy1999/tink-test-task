const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require('dotenv').config()

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const BASE_API_URL_V1 = process.env.BASE_API_URL_V1;
const BASE_API_URL_V2 = process.env.BASE_API_URL_V2;

app.use(express.json());

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS')
  next();
}
app.use(allowCrossDomain);

app.post("/callback", function(req, res) {
  getToken(req.body.code).then(({ access_token }) => {
    getTransactions(access_token).then((data) => {
      res.status(200).send(data.transactions);
    });
  }).catch((err) => {
    res.status(400).send(err);
  });
});

const getToken = async (code) => {
  try {
    const body = {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code"
    };
  
    const response = await fetch(BASE_API_URL_V1 + "/oauth/token", {
      method: "POST",
      body: Object.keys(body)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
        .join("&"),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      }
    });
  
    return response.json();
  } catch (error) {
    throw new Error(error)
  }
}

const getTransactions = async (token) => {
  try {
    const response = await fetch(BASE_API_URL_V2 + "/transactions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    });

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

app.listen('8080', function() {
    console.log("Server is running on port " + process.env.PORT);
});