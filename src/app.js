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
		response.status(201).send("OK");
	} else {
		response.status(400).send("Todos os campos são obrigatórios!");
	}
});

app.post("/tweets", (request, response) => {
	if (request.body.username !== "" && request.body.tweet !== "") {
		tweets = [
			...tweets,
			{
				username: user.username,
				tweet: request.body.tweet,
			},
		];
		response.status(201).send("OK");
	} else {
		response.status(400).send("Todos os campos são obrigatórios!");
	}
});

app.get("/tweets", (request, response) => {
	let page = request.query.page;
	let newestTweets;
	let params = page * -10;
	if (page == 1) {
		newestTweets = tweets.slice(params);
		response.send(newestTweets.reverse());
	}
	if (page > 1) {
		newestTweets = tweets.slice(page * 10 * -1, params + 10);
		response.send(newestTweets.reverse());
	}
	if (page < 1) {
		response.status(400).send("Informe uma página válida!");
	}
});

app.get("/tweets/:username", (request, response) => {
	let userTweets = request.params.username;
	if (userTweets === user.username && tweets.length > 0) {
		let allTweetsFromUser = [];
		for (let i = 0; i < tweets.length; i++) {
			allTweetsFromUser = [
				...allTweetsFromUser,
				{
					username: user.username,
					avatar: user.avatar,
					tweet: tweets[i].tweet,
				},
			];
		}
		response.send(allTweetsFromUser);
	} else {
		response.send("Usuário não tem tweets!");
	}
});

app.listen(5000);
