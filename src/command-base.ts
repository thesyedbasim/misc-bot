import { Interaction, Message } from 'discord.js';
import { commandsListRaw } from './assets/commands-list';

export const handleMessageCreate = (msg: Message) => {
	if (msg.author.bot) return;

	if (!msg.content.toLowerCase().startsWith(process.env.PREFIX!)) return;

	commandsListRaw.forEach((command) => {
		if (
			command.payload.alias.includes(
				msg.content.toLowerCase().split(process.env.PREFIX!)[1].split(' ')[0]
			)
		) {
			try {
				command.run({ msg });
			} catch (err) {
				console.error(err);
			}

			return;
		}
	});
};

export const handleInteractionCreate = (interaction: Interaction) => {
	if (interaction.isButton()) {
		const [id, commandName] = interaction.customId.split('::');

		const command = commandsListRaw.find(
			(cmd) => cmd.payload.alias[0] === commandName
		);

		command?.interactionsHandler![id]({ interaction });
	}
};
