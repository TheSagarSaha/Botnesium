const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { token } = require("./config.json");
const command = ".play";

client.once("ready", () => {
	console.log("Botneisum Online!");
})

client.on("message", message => {
	if (!message.content.startsWith(command)) return;
	else {
		message.channel.send("Working!");
	}
})



client.login(token);
