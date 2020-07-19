const auth = require("../api/auth");

module.exports = (app) => {
  app.post("/api/v1/user", (req, res) => {
    auth.createUser(req, res);
  });
  app.delete("/api/v1/user", (req, res) => {
    auth.remove(req, res);
  });
  app.post("/api/v1/auth", (req, res) => {
    auth.login(req, res);
  });
};
