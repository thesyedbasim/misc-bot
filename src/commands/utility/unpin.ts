import {
	ERR_MESSAGE_NOT_PINNED,
	ERR_MESSAGE_NO_REFERENCE,
	ERR_MESSAGE_UNPIN
} from '../../assets/errors';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['unpin', 'up'],
		description:
			'Want to unpin a message but you do not have privilages? No worries! Just reply to the message and use this command!',
		syntax: '',
		numArgs: { min: 0, max: 0 },
		areNotArgsLowerCase: true,
		isAsync: true
	},
	async ({ msg, args }) => {
		const referenceMessageId = msg.reference?.messageId;

		if (!referenceMessageId) {
			throw ERR_MESSAGE_NO_REFERENCE;
		}

		const referenceMessage = await msg.channel.messages.fetch(
			referenceMessageId
		);

		if (!referenceMessage.pinned) {
			throw ERR_MESSAGE_NOT_PINNED;
		}

		try {
			referenceMessage.unpin();

			try {
				if (args[0].toLowerCase() === 'd') {
					msg.delete();
				} else {
					msg.reply('message unpinned!');
				}
			} catch {
				return;
			}
		} catch {
			throw ERR_MESSAGE_UNPIN;
		}
	}
);
