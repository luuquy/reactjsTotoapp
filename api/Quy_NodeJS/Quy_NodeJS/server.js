const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoute");

const bodyParser = require('body-parser');

require("dotenv").config();

const port = process.env.PORT;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.status(200).send({
		message: "GET"
	});
});

authRoutes(app);

app.listen(port, (req, res) => {
	console.log(`server is starting port ${port}`)
})