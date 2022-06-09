const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require("./config.json");
const  elements  = require("./elements.json");
const prefix = ".";

client.once("ready", () => {
	console.log("Botneisum Online!");
})

client.on("message", message => {
	if (!message.content.startsWith(prefix)) return;

	else {
		// message.channel.send("Working!");
		const command = message.content.substr(1, message.length);
		message.channel.send(verify(command))
	}
	
})

function verify(userCommand) {
	var reply;
	if (userCommand.toLowerCase() == "play") {
		reply = "Will start playing!";
	} else if (userCommand.toLowerCase() == "help") {
		reply = "Welcome to Botnesium! You can either play a game with me or get any information about any elements in the periodic table. \n\nTo play with me, type in **.play**. Or if you want to retrieve any information, type in **.info [followed by the element name]**. For example: `.info hydrogen` will return you with all the information about the Hydrogen element.";
	} else if (userCommand.toLowerCase().substr(0, 4) == "info") {
		reply = "Sending back with info";
	}	else {
		reply = "Command Not Found :( Please check for any typo or type in **.help** for more information. "
	}

	return reply;
}

client.login(token);
