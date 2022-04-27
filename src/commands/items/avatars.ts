import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['avatar', 'pfp', 'dp', 'profile'],
		description: "Get image attachment of anyone's pfp and download them!",
		syntax: '<?member tag>',
		numArgs: { min: 0, max: 1 },
		isAsync: true
	},
	async ({ msg }) => {
		const member = msg.mentions.members?.first()?.user || msg.author;

		const avatar = member?.avatarURL();

		if (!avatar) {
			msg.reply('No avatar');
			return;
		}

		msg.reply({ files: [avatar] });
	}
);
