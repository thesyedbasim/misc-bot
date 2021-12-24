import { MessageEmbed } from 'discord.js';
import { Command } from '../../types/command';
import { getRandomNumber } from '../../utils/getRandomNumber';

export default new Command(
	{
		alias: ['fail', 'failure', 'lose', 'bozo'],
		description: 'Find out your % of failing.',
		syntax: '<?@user>',
		numArgs: { min: 0, max: 1 }
	},
	({ msg }) => {
		const failEmbed = new MessageEmbed().setTitle('fail r8 machine');

		const percentage = getRandomNumber(0, 100);
		const emoji = percentage >= 50 ? ':clown:' : '';

		if (!msg.mentions.members || !msg.mentions.members.first()) {
			failEmbed.setDescription(
				`You have ${percentage}% chance of failing ${emoji}`
			);
		} else {
			failEmbed.setDescription(
				`${
					msg.mentions.members.first()!.displayName
				} has ${percentage}% chance of failing ${emoji}`
			);
		}

		msg.channel.send({ embeds: [failEmbed] });
	}
);
