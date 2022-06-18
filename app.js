/*
	Name: Sagar Saha
	Program Name: Botnesium
	Program Desc: Botnesium is an interactive Discord Bot which is able to play with you and help you learn chemistry at the same time!
	Date Started: June 6th, 2022
	Last Edit Date: TBA
*/

const { Client, Intents, MessageEmbed } = require('discord.js');
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
		const command = message.content.substring(1, message.length).toLowerCase();
		message.channel.send(verify(command))
	}

})

function verify(userCommand) {
	var reply = "default";
	if (userCommand == "play") {
		play();
		reply = "Will start playing!";
	} else if (userCommand == "help") {
		reply = "Welcome to Botnesium! You can either play a game with me or get any information about any elements in the periodic table. \n\nTo play with me, type in **.play**. Or if you want to retrieve any information, type in **.info [followed by the element name]**. For example: `.info hydrogen` will return you with all the information about the Hydrogen element.";
	} else if (userCommand.substring(0, 4) == "info" && userCommand.substring(4, 5) == " ") {
		const name = userCommand.substr(5, userCommand.length);
		reply = info(name);
	} else {
		reply = "Command Not Found :( Please check for any typo or type in **.help** for more information. "
	}

	return reply;
}

function info(elementName) {

	try {

		if (elements[elementName].apperance == null) {
			var app = "none"
		} else {
			var app = elements[elementName].apperance
		}

		const elementEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Detailed Element Information')
		.setURL('https://discord.js.org/')
		.setAuthor({ name: 'Botnesium', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
		.setDescription('User used `.info`. Showing information on `' + elements[elementName].name + "` element. Symbol: `" + elements[elementName].symbol + "`.")
		.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Summary', value: elements[elementName].summary },
			{ name: 'Phase', value: elements[elementName].phase, inline: true },
			{ name: 'Type', value: elements[elementName].category, inline: true },
			{ name: 'Melting Point (°K)', value: elements[elementName].melt.toString(), inline: true },
			{ name: 'Boiling Point (°K)', value: elements[elementName].boil.toString(), inline: true },
			{ name: 'Condensed Electron Config', value: elements[elementName].electron_configuration_semantic, inline: true },
		)
		.addField('Apperance', app, true)
		// .setImage('https://i.imgur.com/AfFp7pu.png')
		.setTimestamp()
		.setFooter({ text: 'Contact Hacker3165#3165 with Inquries', iconURL: 'https://raw.githubusercontent.com/TheSagarSaha/SagarSaha01.github.io/master/images/sagar-saha-avatar.jpg' });
	
		return ({ embeds: [elementEmbed] });

	} catch (error) {
		console.log(error);
		var elementInfo = "Opps! Looks like you've made a typo. Please try again. **Make sure you are using the full element name.**";
	}

	return elementInfo;
}

function play() {
	const randNum = Math.floor(Math.random() * 118);
	const element = elements[Object.keys(elements)[randNum]].name;
	console.log(element);
}

client.login(token);
