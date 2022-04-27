import { Message } from 'discord.js';

export const lHandler = (msg: Message) => {
	if (msg.content.toLowerCase() === 'l') {
		msg.channel.send('L');
	}
};
