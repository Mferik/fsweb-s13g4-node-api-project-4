const userModel = require("./model");

const validateUserPayload = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: "Eksik alan var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateUniqueUserName = (req, res, next) => {
  try {
    const { username } = req.body;
    const allUsers = userModel.getAllUsers();
    let isExistUsername =
      allUsers.filter((x) => x.username == username).length > 0;

    if (isExistUsername) {
      res.status(400).json({ message: "Böyle bir kullanıcı mevcut" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateLogin = (req, res, next) => {
  try {
    let user = { username: req.body.username, password: req.body.password };
    let existUser = userModel.checkLogin(user);
    if (!existUser) {
      res.status(404).json({ message: "Login parametreleri hatalı" });
    } else {
      req.findedUser = existUser;
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  validateUniqueUserName,
  validateUserPayload,
  validateLogin,
};
