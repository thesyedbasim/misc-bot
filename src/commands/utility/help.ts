import { MessageEmbed } from 'discord.js';
import { commandsList, commandsListRaw } from '../../assets/commands-list';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['help', 'info', 'cmds', 'cmd'],
		description:
			'See a list of all commands available! You can even learn more about a specific command by passing the command name as argument!',
		syntax: '<?cmd>',
		numArgs: { min: 0, max: 1 }
	},
	({ msg, args }) => {
		const helpEmbed = new MessageEmbed();

		let searchedCommand: Command | undefined;

		if (args[0]) {
			searchedCommand = commandsListRaw.find((cmd) =>
				cmd.payload.alias.includes(args[0])
			);
		}

		if (!searchedCommand) {
			helpEmbed
				.setTitle('List of Misc Bot commands')
				.setDescription(
					`:arrow_right: Use \`${process.env.PREFIX}[command name]\` to use a command.`
				);

			commandsList.forEach((commands, category) => {
				helpEmbed.addField(
					category,
					commands.map((cmd) => `\`${cmd.payload.alias[0]}\``).join(', ')
				);
			});

			helpEmbed.setFooter(
				`${process.env.PREFIX}help [command name] to see more details`
			);
		} else {
			const commandAliases = searchedCommand.payload.alias
				.map((alias) => `\`${alias}\``)
				.join(', ');

			helpEmbed.setTitle(`Info | ${process.env.PREFIX}${args[0]}`);
			helpEmbed.setDescription(searchedCommand.payload.description);
			helpEmbed.addField(
				'Usage:',
				`\`${process.env.PREFIX}${args[0]} ${searchedCommand.payload.syntax}\``
			);
			helpEmbed.addField('Aliases/Triggers:', commandAliases);
			helpEmbed.setFooter(`Usage Syntax: <required> | <?optional>`);
		}

		msg.channel.send({ embeds: [helpEmbed] });
	}
);
