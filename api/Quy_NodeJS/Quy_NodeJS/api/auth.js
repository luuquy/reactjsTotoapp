const User = require("../models/User");
const bcrypt = require("bcryptjs");
const SALT = 10;
var jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  console.log(req);
  if (!req.body) {
    return res.status(400).send({
      message: "Body can't be not null",
    });
  }

  const body = req.body;
  User.findByUsername(body.username)
    .then((result) => {
      if (!result) {
        var salt = bcrypt.genSaltSync(SALT);
        var hash = bcrypt.hashSync(body.password, salt);
        body.password = hash;
        User.create(body)
          .then((value) => {
            if (!value)
              res.status(400).send({
                message: "Can't create new user",
              });
            res.status(200).send({
              message: "User can be created",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(400).send({
          message: "User account have been exist aldready",
        });
      }
    })
    .catch((err) => console.log(err));
};

exports.remove = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).send({
      message: "Body can't be not null",
    });
  }
  User.delete(body.iduser)
    .then((value) => {
      if (!value)
        res.status(400).send({
          message: "Can't delete new user",
        });
      res.status(200).send({
        message: "User can be deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.login = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(401).send({
      message: "Body can't be not null",
    });
  }

  if (body.username || body.password) {
    User.auth(body).then((user) => {
      if (!user) {
        return res.status(403).send({ message: "Cant find username" });
      }
      if (bcrypt.compareSync(body.password, user.password)) {
        token = jwt.sign(
          {
            iduser: user.id,
            username: user.username,
            email: user.email,
            city: user.city,
          },
          "Demo never die",
          {
            expiresIn: "7d",
            issuer: "demo.com",
            subject: "userinfo",
          },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send({
                accessToken: token,
              });
            }
          }
        );
      }
    });
  } else {
    return res.status(400).send({ message: "Not found username" });
  }
};
