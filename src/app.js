import express from "express";

const app = express();

let user = {
	username: "",
	avatar: "",
};

let tweets = {
	username: "",
	tweet: "",
};

app.listen(5000);
