const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const SessionStore = require("connect-session-knex")(session);

const authRouter = require("./auth/auth-router");
const userRouter = require("./users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(
	session({
		name: "cikolatacips",
		secret: "secret_cikolatacips",

		cookie: { maxAge: 1000 * 60 * 60, secure: false },
		store: new SessionStore({
			knex: require("../data/db-config"),
		}),
		sidFieldName: "sid",
		createTable: true,
		clearInterval: 1000 * 60 * 60,
		resave: true,
		saveUninitialized: false,
	})
);

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
	res.json({ api: "up" });
});

server.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = server;
