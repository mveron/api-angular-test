const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const db = "mongodb://mveron:cuentas84@ds237563.mlab.com:37563/eventsdb";

mongoose.connect(
  db,
  error => {
    if (error) {
      console.error(error);
    } else {
      console.log("Connected to mongoDB.");
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);

  user.save((error, registeredUser) => {
    if (error) {
      console.error("Error: " + error);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.error(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else if (user.password !== userData.password) {
        res.status(401).send("Invalid password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({ token });
      }
    }
  });
});

router.get("/events", (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "2",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "3",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "4",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "5",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "6",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    }
  ];

  res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "2",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "3",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "4",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "5",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    },
    {
      _id: "6",
      name: "Auto Expo",
      description: "Lorem Ipsum",
      date: "2018-11-23T18:25:43.511Z"
    }
  ];

  res.json(events);
});

module.exports = router;
