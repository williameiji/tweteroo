# <p align = "center"> Tweetero </p>

## :clipboard: Descrição

backend project for a 'copy' of twitter.

---

## :computer: Technologies and Concepts


- Node.js
- JavaScript
- Nodemon

---

## :rocket: Routes

```yml
POST /sign-up
    - Route to register a new user
    - headers: {}
    - body: {
        "username": "Lorem Ipsum",
        "avatar": "https://optimistic-rabbit.org",
    }
```

```yml
POST /tweets
    - Route to add a new tweet
    - headers: {}
    - body: {
        "username": "Lorem Ipsum",
        "avatar": "https://optimistic-rabbit.org",
        "tweet": "Consectetur velit eligendi animi nostrum veritatis."
    }
```

```yml
GET /tweets
    - Route to list all tweets
    - headers: {}
    - body: {}
```

```yml
GET /tweets/:username
- Route to list all tweets from a user
```

## 🏁 Running the application

This project was started with the [Express](https://www.npmjs.com/package/express), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/williameiji/tweteroo
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server

```
npm start
```
