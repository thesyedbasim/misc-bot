import { UserError } from '../types/userError';

// emoji command errors
export const ERR_NO_ATTACHMENT = new UserError(
	'can u attach an image so that i can create emoji, you bot?'
);

export const ERR_LARGE_FILE_SIZE_GUILD_EMOJI = new UserError(
	"discord doesn't support images larger than 256kb for emojis. try a smaller image."
);

// spam command errors
export const ERR_SPAM_LIMIT_REACHED = (spamLimit: number) =>
	new UserError(`i am not jobless to spam more than ${spamLimit} times.`);

// channel command errors
export const ERR_CHANNEL_CREATE = new UserError(
	'There was some error creating that channel.'
);
