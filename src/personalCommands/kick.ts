import { Message, TextChannel } from 'discord.js';
import { client } from '../main';
import { separateGuildAndEntity } from '../utils/separateGuildAndEntity';

export const kick = async (msg: Message, args: string[]) => {
	if (args.length === 0) return msg.reply('missing args');

	const memberId = args[0];

	const guild = await client.guilds.fetch(
		separateGuildAndEntity((msg.channel as TextChannel).name)[1]
	);
	const member = await guild.members.fetch(memberId);

	if (!member) {
		msg.reply('no such member');

		return;
	}

	if (!member.kickable) {
		msg.reply(
			`unable to kick

			guild: ${guild.id},
			member: ${member.displayName}`
		);

		return;
	}

	try {
		member.kick('for disrespecting misc');

		msg.reply('successfully kicked');
	} catch {
		return;
	}
};
