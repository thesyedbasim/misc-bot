import { MessageEmbed } from 'discord.js';
import { setVoteMessageRef } from '../../assets/votes';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['vote', 'opinion', 'poll'],
		description: 'Create a voting poll to get opinions about server members!',
		syntax: '<message>',
		missingArgs: 'Please specify a message to vote!',
		numArgs: { min: 1, max: null },
		isAsync: true,
		areNotArgsLowerCase: true
	},
	async ({ msg, query }) => {
		const voteMessage = await msg.channel.send({
			content: '@everyone vote!',
			embeds: [new MessageEmbed().setDescription(query)]
		});

		msg.channel.send(
			'**TIP:** You can use `bot ratio` to see the latest poll ratio.'
		);

		setVoteMessageRef(voteMessage);

		voteMessage.react('👍');
		voteMessage.react('👎');
	}
);
