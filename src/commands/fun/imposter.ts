import { GuildMember } from 'discord.js';
import { Command } from '../../types/command';
import { getRandomNumber } from '../../utils/getRandomNumber';

export default new Command(
	{
		alias: ['nigga', 'nigger', 'gay', 'trans', 'imposter', 'impo', 'harami', 'clown'],
		description: 'Detect the imposter in the server.',
		syntax: '',
		numArgs: { min: 0, max: 0 },
		areNotArgsLowerCase: true,
		isAsync: true
	},
	async ({ msg, aliasUsed }) => {
		msg.channel.send(`Detecting ${aliasUsed}...`);

		const membersCollection = await msg.guild?.members.fetch();

		const members: GuildMember[] = [];

		membersCollection?.forEach((member) => {
			if (member.user.bot || member === null) return;

			members.push(member);
		});

		const imposterMember = members[getRandomNumber(0, members.length)];

		setTimeout(() => {
			msg.channel.send(`The ${aliasUsed} is: ${imposterMember.toString()}`);
		}, 2000);
	}
);
