import { Message } from 'discord.js';
import { PERSONAL_GUILD_ID } from './assets/ids';
import { client } from './main';
import { kick } from './personalCommands/kick';
import { reply } from './personalCommands/reply';

const PERSONAL_BOT_PREFIX = '?';

export const personalCommandMessageHandler = async (msg: Message<boolean>) => {
	if (msg.guild?.id !== PERSONAL_GUILD_ID) return;

	if (msg.channel.type !== 'GUILD_TEXT') return;

	if (!msg.channel.name.match(/ai-.*-.*/g)) return;

	if (msg.author.bot) return;

	let isCommand = false;

	const guildId = msg.channel.name.split('-')[1];
	const channelId = msg.channel.name.split('-')[2];

	const guild = await client.guilds.fetch(guildId);
	const channel = await guild.channels.fetch(channelId);

	if (msg.content.toLowerCase().startsWith(PERSONAL_BOT_PREFIX))
		isCommand = true;

	const commandUsed = msg.content
		.toLowerCase()
		.replace(PERSONAL_BOT_PREFIX, '')
		.split(' ')[0];

	const args = msg.content
		.toLowerCase()
		.replace(PERSONAL_BOT_PREFIX, '')
		.split(' ')
		.slice(1);

	if (isCommand) {
		if (commandUsed === 'kick') await kick(msg, args);
		else if (commandUsed === 'reply') await reply(msg, args);

		return;
	}

	if (channel?.type !== 'GUILD_TEXT') return;

	channel.send(msg.content);
};
