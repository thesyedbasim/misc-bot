import { Message } from 'discord.js';

export const lHandler = (msg: Message) => {
	if (msg.content.toLowerCase() === 'l') {
		msg.channel.send('L');
	} else if (msg.content.toLowerCase() === 'w') {
		msg.channel.send('W');
	}
};
