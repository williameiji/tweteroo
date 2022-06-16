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

function isUrl(urlAvatar) {
	var regexp =
		/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return regexp.test(urlAvatar);
}

app.post("/sign-up", (request, response) => {
	if (request.body.username !== "" && isUrl(request.body.avatar)) {
		user = {
			username: request.body.username,
			avatar: request.body.avatar,
		};
		response.send("OK");
	} else {
		response.status(400).send("Todos os campos são obrigatórios!");
	}
});

app.post("/tweets", (request, response) => {
	if (request.body.username !== "" && request.body.tweet !== "") {
		tweets = [
			...tweets,
			{
				username: request.body.username,
				tweet: request.body.tweet,
			},
		];
		response.send("OK");
	} else {
		response.status(400).send("Todos os campos são obrigatórios!");
	}
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
