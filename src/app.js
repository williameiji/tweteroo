import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

let user = {
	username: "",
	avatar: "",
};

let tweets = {
	username: "",
	tweet: "",
};

app.post("/sign-up", (request, response) => {
	user = {
		username: request.body.username,
		avatar: request.body.avatar,
	};
	response.send("OK");
});

app.listen(5000);
