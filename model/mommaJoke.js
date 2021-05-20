const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mommaSchema = new Schema(
	{
		troll: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
			required: true,
		},
		by: {
			type: String,
			required: true,
			default: "mommaJokes",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("MommaJoke", mommaSchema);
