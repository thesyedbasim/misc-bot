import { ServerError } from '../types/serverError';
import { UserError } from '../types/userError';

// messages errors
export const ERR_MESSAGE_NO_REFERENCE = new UserError('which message bruh');
export const ERR_MESSAGE_DELETE = new ServerError('Unable to delete message.');

// emoji command errors
export const ERR_NO_ATTACHMENT = new UserError(
	'can u attach an image so that i can create emoji, you bot?'
);

export const ERR_LARGE_FILE_SIZE_GUILD_EMOJI = new UserError(
	"discord doesn't support images larger than 256kb for emojis. try a smaller image."
);

export const ERR_DELETE_GUILD_EMOJI = new ServerError(
	'there was some error deleting that emoji.'
);

// spam command errors
export const ERR_SPAM_LIMIT_REACHED = (spamLimit: number) =>
	new UserError(`i am not jobless to spam more than ${spamLimit} times.`);

// channel command errors
export const ERR_CHANNEL_CREATE = new UserError(
	'There was some error creating that channel.'
);

// pin and unpin errors
export const ERR_MESSAGE_PIN = new ServerError('Unable to pin message.');

export const ERR_MESSAGE_UNPIN = new ServerError('Unable to unpin message.');

export const ERR_MESSAGE_ALREADY_PINNED = new UserError(
	'this message is already pinned you bot'
);

export const ERR_MESSAGE_NOT_PINNED = new UserError(
	'how tf can i unpin a message which is not pinned only?'
);

// nickname
export const ERR_CHANGE_NICKNAME = new ServerError(
	'Unable to change nickname.'
);
