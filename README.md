# nyt room maps

This is a three-part project.

1. [Maps](#Maps) — Creates images for every room
2. [Server](#Server) — Hosts the images
3. [Bot](#Bot) - Slack slash command that responds to room requests

_Disclaimer: This project was built during a hack week. It is buggy. There are no plans for improvement or maintenance._

## Maps

This draws rooms on top of the floor plans in [images](images) using the same [coordinates file](server/data/rooms.json) from the server and outputs images for use on the server.

* *To add or edit floors*: edit the floor plans in [images](images)

* *To add or fix rooms*: add the coordinates to [rooms.json](server/data/rooms.json)

### To generate new maps

Change into the directory

```unix
cd maps
```

Start the app

```javascript
npm start
```

## Server

This is a simple server generated using [Express generator](https://expressjs.com/en/starter/generator.html) and hosted on [Heroku](https://nyt-find.herokuapp.com/).

Change into the directory

```unix
cd server
```

* *To run locally*: `DEBUG=myapp:* npm start`

* *To push server changes*: Commit changes and `git push heroku master`

## Bot

This is a simple Slack slash command built on top of the example app from [botkit](https://github.com/howdyai/botkit) and hosted on [Heroku]([Heroku](https://nyt-find-app.herokuapp.com/).

## People

The original author is [@yurivictor](https://github.com/yurivictor).

## License

[MIT](LICENSE)

---

[back to top](#nyt-room-maps)
