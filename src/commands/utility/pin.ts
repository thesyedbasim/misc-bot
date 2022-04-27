import {
	ERR_MESSAGE_ALREADY_PINNED,
	ERR_MESSAGE_NO_REFERENCE,
	ERR_MESSAGE_PIN
} from '../../assets/errors';
import { Command } from '../../types/command';

export default new Command(
	{
		alias: ['pin', 'p'],
		description:
			'Want to pin a message but you do not have privilages? No worries! Just reply to the message and use this command!',
		syntax: '<?"d">',
		numArgs: { min: 0, max: 1 },
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

		if (referenceMessage.pinned) {
			throw ERR_MESSAGE_ALREADY_PINNED;
		}

		try {
			referenceMessage.pin();

			try {
				if (args[0].toLowerCase() === 'd') {
					msg.delete();
				}
			} catch {
				return;
			}
		} catch {
			throw ERR_MESSAGE_PIN;
		}
	}
);
