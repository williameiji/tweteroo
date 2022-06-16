import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let user = {
	username: "",
	avatar: "",
};

let tweets = [];

app.post("/sign-up", (request, response) => {
	user = {
		username: request.body.username,
		avatar: request.body.avatar,
	};
	response.send("OK");
});

app.post("/tweets", (request, response) => {
	tweets = [
		...tweets,
		{
			username: request.body.username,
			tweet: request.body.tweet,
		},
	];
	response.send("OK");
});

app.get("/tweets", (request, response) => {
	if (tweets.length > 10) {
		let newestTweets = tweets.slice(-10);
		response.send(newestTweets);
	} else {
		response.send(tweets);
	}
});

app.listen(5000);
