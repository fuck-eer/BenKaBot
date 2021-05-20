const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trollSchema = new Schema(
	{
		troll: {
			type: String,
			required: true,
		},
		number: {
			type: Number,
			required: true,
			default: 1,
		},
		by: {
			type: String,
			required: true,
			default: "unknown",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Troll", trollSchema);
