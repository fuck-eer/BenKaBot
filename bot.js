const Discord = require("discord.js");
require("dotenv").config();
const mongoose = require("mongoose");
const MommaJoke = require("./model/mommaJoke");
const Troll = require("./model/troll");

const disClient = new Discord.Client();

disClient.login(process.env.BOT_TOKEN);

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((e) => {
		console.log("connected to DB");
		disClient.on("ready", readyDiscord);

		disClient.on("message", onmessage);

		// disClient.on("");Y

		// disClient.on("");
	})
	.catch((err) => {
		console.log(err);
	});

function readyDiscord() {
	console.log("heyyyy!!");
}

function onmessage(msg) {
	if (msg.content === "!momma") {
		getMommaJoke(msg);
	} else if (msg.content.includes("!learn$")) {
		postUserJoke(msg);
	} else if (msg.content === "Hello") {
		console.log(msg.author);
		msg.reply(msg.author);
	}
}

function getMommaJoke(msg) {
	MommaJoke.countDocuments()
		.then((e) => {
			return MommaJoke.findOne({ number: getTrollNumber(1, e) });
		})
		.then((troll) => {
			msg.reply(troll.troll);
		})
		.catch((err) => {
			console.log(err);
		});
}

function postUserJoke(msg) {
	//"!learn$maa ke moome
	console.log(msg.author.username);
	const trollmsg = msg.content.split("$")[1];
	const by = msg.author.username;

	const troll = new Troll({
		troll: trollmsg,
		by: by || "user",
	});

	troll
		.save({ $inc: { number: 1 } })
		.then((e) => {
			console.log(e);
			msg.reply("haan bhai accha tha!");
		})
		.catch((err) => {
			console.log(err);
		});
}

function getTrollNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}