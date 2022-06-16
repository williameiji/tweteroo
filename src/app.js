import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

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
	const getUserName = request.headers.user;
	if (getUserName !== "" && request.body.tweet !== "") {
		tweets = [
			...tweets,
			{
				username: getUserName,
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
		tweets.forEach((itens) =>
			allTweetsFromUser.push({
				username: user.username,
				avatar: user.avatar,
				tweet: itens.tweet,
			})
		);
		response.send(allTweetsFromUser);
	} else {
		response.send("Usuário não tem tweets!");
	}
});

app.listen(PORT);
