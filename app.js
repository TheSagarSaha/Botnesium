const {	Client,	Intents} = require('discord.js');
const client = new Client({	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const { token } = require("./config.json");
const elements = require("./elements.json");
const prefix = ".";
const BOLD = "**"
const newLine = " \n"

client.once("ready", () => {
	console.log("Botneisum Online!");
})

client.on("message", message => {
	if (!message.content.startsWith(prefix)) return;

	else {
		// message.channel.send("Working!");
		const command = message.content.substring(1, message.length);
		message.channel.send(verify(command))
	}

})

function verify(userCommand) {
	var reply = "default";
	if (userCommand.toLowerCase() == "play") {
		reply = "Will start playing!";
	} else if (userCommand.toLowerCase() == "help") {
		reply = "Welcome to Botnesium! You can either play a game with me or get any information about any elements in the periodic table. \n\nTo play with me, type in **.play**. Or if you want to retrieve any information, type in **.info [followed by the element name]**. For example: `.info hydrogen` will return you with all the information about the Hydrogen element.";
	} else if (userCommand.toLowerCase().substring(0, 4) == "info" && userCommand.substring(4, 5) == " ") {
		const name = userCommand.substr(5, userCommand.length);
		reply = info(name.toLowerCase());
	} else {
		reply = "Command Not Found :( Please check for any typo or type in **.help** for more information. "
	}

	return reply;
}

function info(elementName) {
	console.log(elementName);
	var elementInfo = "";
	elementInfo += "**Symbol**: `" + elements[elementName].symbol + "`" + newLine;
	elementInfo += "**Phase**: " + elements[elementName].phase + newLine;
	elementInfo += "**Type**: " + elements[elementName].category + newLine;
	elementInfo += "**Boiling Point**: " + elements[elementName].boil + ", **Melting Point**: " + elements[elementName].melt + newLine;
	elementInfo += "**Condensed Electron Cofig**: " + elements[elementName].electron_configuration_semantic + newLine;
	elementInfo += "**Color**: " + elements[elementName].appearance + newLine + newLine;
	elementInfo += "**Summary**: " + "```" + elements[elementName].summary + "```" + newLine;

	return elementInfo;
}

client.login(token);
