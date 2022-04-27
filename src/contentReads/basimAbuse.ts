import { Message } from 'discord.js';
import { blacklistedMembers } from '../assets/blacklisted';

const isAbusive = (content: string) => {
	const isDirect =
		((content.includes('kiss') || content.includes('kissing')) &&
			content.includes('wall')) ||
		(content.includes('basim') &&
			(content.includes('kiss') || content.includes('wall')));

	const isIndirect =
		((content.includes('k*') ||
			content.includes('k_') ||
			content.includes('kiss')) &&
			(content.includes('wall') ||
				content.includes('w*') ||
				content.includes('w_'))) ||
		(content.includes('basim') &&
			(content.includes('k*') ||
				content.includes('k_') ||
				content.includes('w*') ||
				content.includes('w__')));

	if (isDirect) return 1;
	if (isIndirect) return 2;
	else return 0;
};

export const isAbusiveHandler = (msg: Message) => {
	const content = msg.content.toLowerCase();

	if (
		content === 'sorry' &&
		blacklistedMembers.includes(msg.member?.id || '')
	) {
		blacklistedMembers.filter((member) => member !== msg.member?.id);

		msg.reply('gud. forgave u');
	}

	if (!isAbusive(content)) return;

	try {
		msg.delete();
	} catch {
		return;
	}

	if (isAbusive(content) === 1) {
		try {
			msg.member?.kick('abusing basim the great');
		} catch {
			return;
		}
	} else if (isAbusive(content) === 2) {
		blacklistedMembers.push();

		msg.reply('wt u thought u will escape??');
		msg.channel.sendTyping();
		setTimeout(() => {
			msg.channel.send(
				'now type sorry before 5 secs or else you will be kicked...'
			);
		}, 1000);
	}
};
