import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['destroy', 'dest', 'bulkdelete', 'bd'],
		description: 'CAUTION: Destroys messages in bulk.',
		syntax: '<no. of msgs to delete>',
		numArgs: { min: 1, max: 1 },
		areNotArgsLowerCase: true,
		isAsync: true,
		isOwnerOnly: true
	},
	async ({ msg, args }) => {
		const numOfMsgsToDelete = +args[0] || 100;

		const bulkDelete = async (numOfMsgsToDelete: number) => {
			if (msg.channel.type !== 'GUILD_TEXT') return;

			try {
				await msg.channel.bulkDelete(numOfMsgsToDelete);
			} catch (err) {
				console.error('cannot delete message', err);
			}
		};

		if (numOfMsgsToDelete <= 100) {
			bulkDelete(numOfMsgsToDelete);
		} else {
			for (let count = 0; count <= numOfMsgsToDelete; count += 100) {
				bulkDelete(numOfMsgsToDelete);
			}
		}
	}
);
