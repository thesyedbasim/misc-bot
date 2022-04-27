import {
	ERR_MESSAGE_DELETE,
	ERR_MESSAGE_NO_REFERENCE
} from '../../assets/errors';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['delete', 'del', 'd', 'dd'],
		description:
			'Want to delete a message but you do not have privilages? No worries! Just reply to the message and use this command! Use dd command to delete your command message to leave no traces.',
		syntax: '',
		numArgs: { min: 0, max: 0 },
		areNotArgsLowerCase: true,
		isAsync: true
	},
	async ({ msg, aliasUsed }) => {
		const referenceMessageId = msg.reference?.messageId;

		if (!referenceMessageId) {
			throw ERR_MESSAGE_NO_REFERENCE;
		}

		const referenceMessage = await msg.channel.messages.fetch(
			referenceMessageId
		);

		if (!referenceMessage.deletable) {
			throw ERR_MESSAGE_DELETE;
		}

		try {
			referenceMessage.delete();
		} catch (err) {
			throw ERR_MESSAGE_DELETE;
		}

		if (aliasUsed === 'dd') {
			try {
				msg.delete();
			} catch {
				return;
			}
		}
	}
);
