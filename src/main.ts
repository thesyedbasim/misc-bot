// import http from 'http';
import { config } from 'dotenv';
import { Client, Intents } from 'discord.js';

import { loadCommands } from './load-commands';
import { handleInteractionCreate, handleMessageCreate } from './command-base';
import { personalCommandMessageHandler } from './personal-command-handler';
import { contentReader } from './contentReads/contentReader';

config({ path: 'config.env' });

export const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_MEMBERS
	]
});

client.once('ready', async () => {
	console.log('Bot is up and running!');

	await loadCommands();

	client.user!.setActivity({
		type: 'LISTENING',
		name: `${process.env.PREFIX}help`
	});
});

client.on('messageCreate', handleMessageCreate);

// BASED ON MESSAGE CONTENT
client.on('messageCreate', contentReader);

client.on('messageCreate', personalCommandMessageHandler);

client.on('interactionCreate', handleInteractionCreate);

client.login(process.env.DISCORD_BOT_CLIENT_TOKEN);

/*
http
	.createServer((_, response) => {
		response.end('hello');
	})
	.listen(process.env.PORT);
*/

process.on('uncaughtException', (err) => {
	console.error(err);
});

process.on('unhandledRejection', (err) => {
	console.error(err);
});
