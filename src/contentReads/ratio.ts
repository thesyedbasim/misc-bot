import { Message } from 'discord.js';
import { getRandomNumber } from '../utils/getRandomNumber';

export const ratioHandler = (msg: Message) => {
	if (
		msg.content.toLowerCase() === 'ratio' ||
		msg.content.toLowerCase().includes('ratio ') ||
		msg.content.toLowerCase().includes(' ratio') ||
		msg.content.toLowerCase().includes(' ratio ')
	) {
		const randNum = getRandomNumber(1, 100);

		// 15/100 chance of occuring
		if (randNum > 85) {
			msg.reply('no');
		} else {
			msg.reply(':100:');
		}
	}
};
