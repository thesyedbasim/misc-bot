import http from 'http';
import { config } from 'dotenv';
import { Client, Intents } from 'discord.js';

import { loadCommands } from './load-commands';
import { handleInteractionCreate, handleMessageCreate } from './command-base';
import axios from 'axios';

config({ path: 'config.env' });

export const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
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
client.on('interactionCreate', handleInteractionCreate);

client.login(process.env.DISCORD_BOT_CLIENT_TOKEN);

setInterval(() => {
	try {
		axios.get(process.env.HOSTING_URL!);
	} catch (err) {
		console.error('NETWORK ERROR', err);
	}
}, 25 * 60 * 1000);

http
	.createServer((_, response) => {
		response.end('hello');
	})
	.listen(process.env.PORT);

process.on('uncaughtException', (err) => {
	console.error(err);
});

process.on('unhandledRejection', (err) => {
	console.error(err);
});
