import { Message } from 'discord.js';
import { lHandler } from './l';
import { ratioHandler } from './ratio';

export const contentReader = (msg: Message<boolean>) => {
	if (msg.author.bot) return;

	ratioHandler(msg);
	lHandler(msg);
};
