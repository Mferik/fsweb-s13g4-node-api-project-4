const express = require("express");

const server = express();
const userModel = require("./model");
const middleware = require("./middleware");

server.use(express.json());

server.get("/api/kullanicilar", (req, res, next) => {
  try {
    let allUsers = userModel.getAllUsers();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

server.get("/api/kullanicilar/:id", (req, res, next) => {
  try {
    let user = userModel.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Böyle bir kullanıcı yok." });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

server.post(
  "/api/kayitol",
  middleware.validateUserPayload,
  middleware.validateUniqueUserName,
  (req, res, next) => {
    try {
      let insertedUser = userModel.insert(req.body);
      res.status(201).json(insertedUser);
    } catch (error) {
      next(error);
    }
  }
);

server.post(
  "/api/giris",
  middleware.validateUserPayload,
  middleware.validateLogin,
  (req, res, next) => {
    try {
      res.json({ message: `Welcome ${req.findedUser.username}` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = server;
