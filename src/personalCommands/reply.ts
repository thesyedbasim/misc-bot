import { Message, TextChannel } from 'discord.js';
import { client } from '../main';
import { separateGuildAndEntity } from '../utils/separateGuildAndEntity';

export const reply = async (msg: Message, args: string[]) => {
	if (args.length < 2) return msg.reply('missing args');

	const messageId = args[0].split('-')[1];

	const guild = await client.guilds.fetch(
		separateGuildAndEntity((msg.channel as TextChannel).name)[1]
	);
	const channel = (await guild.channels.fetch(
		args[0].split('-')[0]
	)) as TextChannel;
	const message = await channel.messages.fetch(messageId);

	if (!message) {
		msg.reply('no such message');

		return;
	}

	try {
		message.reply(args.slice(1).join(' '));
	} catch {
		return;
	}
};
