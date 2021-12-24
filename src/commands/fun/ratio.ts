import { MessageEmbed } from 'discord.js';
import { Colors } from '../../assets/colors';
import { voteMessageRef } from '../../assets/votes';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['ratio'],
		description: 'Get the ratio for the latest poll.',
		syntax: '',
		numArgs: { min: 0, max: 0 },
		isAsync: true
	},
	async ({ msg }) => {
		if (!voteMessageRef) {
			msg.reply(
				'There are no active polls at the moment. Create new one by using `bot vote` command!'
			);

			return;
		}

		const ratioEmbed = new MessageEmbed()
			.setDescription(voteMessageRef.embeds[0].description!)
			.addField('Upvotes', '0', true)
			.addField('Downvotes', '0', true);

		const numOfUpvotes: number =
			voteMessageRef.reactions.cache.find(
				(reaction) => reaction.emoji.name === '👍'
			)?.count || 0;

		const numOfDownvotes: number =
			voteMessageRef.reactions.cache.find(
				(reaction) => reaction.emoji.name === '👎'
			)?.count || 0;

		if ((numOfUpvotes || 0) > (numOfDownvotes || 0))
			ratioEmbed.setColor(Colors.GREEN);
		else if ((numOfDownvotes || 0) > (numOfUpvotes || 0))
			ratioEmbed.setColor(Colors.RED);
		else ratioEmbed.setColor(Colors.BLUE);

		if (!(numOfUpvotes - 1 <= 0))
			ratioEmbed.fields.find((field) => field.name === 'Upvotes')!.value = (
				numOfUpvotes - 1
			).toString();

		if (!(numOfDownvotes - 1 <= 0))
			ratioEmbed.fields.find((field) => field.name === 'Downvotes')!.value = (
				numOfDownvotes - 1
			).toString();

		voteMessageRef.reply({
			embeds: [ratioEmbed]
		});
	}
);
