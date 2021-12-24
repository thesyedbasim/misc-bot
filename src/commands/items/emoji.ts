import { DiscordAPIError, Guild, GuildEmoji } from 'discord.js';
import {
	ERR_LARGE_FILE_SIZE_GUILD_EMOJI,
	ERR_NO_ATTACHMENT
} from '../../assets/errors';
import { Command } from '../../types/command';

const createGuildEmoji: (payload: {
	attachment: string;
	emojiName: string;
	guild: Guild;
}) => Promise<GuildEmoji> = ({ attachment, emojiName, guild }) => {
	return guild.emojis.create(attachment, emojiName);
};

export default new Command(
	{
		alias: ['emoji'],
		description: 'Easily add emojis to your server and have fun with it!',
		syntax: '<emoji name>',
		numArgs: { min: 1, max: 1 },
		missingArgs: 'Please specify the emoji name',
		isAsync: true
	},
	async ({ msg, args }) => {
		const attachment = msg.attachments.first();

		if (!attachment) {
			throw ERR_NO_ATTACHMENT;
		}

		try {
			await createGuildEmoji({
				attachment: attachment.url,
				emojiName: args[0],
				guild: msg.guild!
			});
		} catch (err) {
			if (err instanceof DiscordAPIError) {
				if (err.code === 50035) {
					throw ERR_LARGE_FILE_SIZE_GUILD_EMOJI;
				}

				return;
			}

			console.error(err);
		}

		msg.channel.send(args[0]);
	}
);
