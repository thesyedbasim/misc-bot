import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['crash'],
		description: "An easy way to crash your browser. It's not rick roll!",
		syntax: '',
		numArgs: { min: 0, max: 0 }
	},
	({ msg }) => {
		const crashEmbed = new MessageEmbed().setDescription(
			"An easy way to crash your browser. It's not rick roll!"
		);

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Crash your Browser')
				.setStyle('LINK')
				.setURL('https://crash-your-browser.netlify.app')
		);

		msg.channel.send({ embeds: [crashEmbed], components: [row] });
	}
);
