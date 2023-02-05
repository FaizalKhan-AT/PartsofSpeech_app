const { analyseText } = require("../controllers/analyse");

const Router = require("express").Router();

Router.route("/").post(analyseText);

module.exports = Router;
