const Sequelize = require("sequelize");
const db = require("../utils/config/database").connection;

const User = db.define("user", {
  iduser: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  active: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
  twofactory: {
    type: Sequelize.TINYINT,
    defaultValue: 0,
  },
});

db.sync();

module.exports = {
  findById: (id) => {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          iduser: id,
        },
      })
        .then((req) => {
          resolve(req);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          username: username,
        },
      })
        .then((req) => {
          resolve(req);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  create: (user) => {
    return new Promise((resolve, reject) => {
      User.create({
        fullname: user.fullname,
        username: user.username,
        password: user.password,
        city: user.city,
        email: user.email,
      })
        .then((req) => {
          resolve(req);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  auth: (user) => {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          username: user.username,
        },
      })
        .then((req) => {
          console.log(req);
          resolve(req);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      User.destroy({ where: { iduser: id } })
        .then((req) => {
          resolve(req);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
