import { Message } from 'discord.js';

export const ratioHandler = (msg: Message) => {
	if (
		msg.content.toLowerCase() === 'ratio' ||
		msg.content.toLowerCase().includes('ratio ') ||
		msg.content.toLowerCase().includes(' ratio') ||
		msg.content.toLowerCase().includes(' ratio ')
	) {
		msg.reply(':100:');
	}
};
