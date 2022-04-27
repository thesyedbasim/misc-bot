import { DiscordAPIError, Guild, GuildEmoji } from 'discord.js';
import {
	ERR_LARGE_FILE_SIZE_GUILD_EMOJI,
	ERR_NO_ATTACHMENT,
	ERR_DELETE_GUILD_EMOJI
} from '../../assets/errors';
import { Command } from '../../types/command';

const isEmoji = (name: string): boolean => {
	const emojiRegex = /<:.*:.*>/g;

	const doesEmojiMatchRegex = name.match(emojiRegex);

	console.log(doesEmojiMatchRegex);

	return doesEmojiMatchRegex ? doesEmojiMatchRegex.length > 0 : false;
};

const getEmojiId = (name: string): string => {
	const emojiNameRegex = /<:.*:/g;

	let emojiId = name;

	emojiId = emojiId.replace(emojiNameRegex, '');
	emojiId = emojiId.replace('>', '');

	return emojiId;
};

const createGuildEmoji: (payload: {
	attachment: string;
	emojiName: string;
	guild: Guild;
}) => Promise<GuildEmoji> = ({ attachment, emojiName, guild }) => {
	return guild.emojis.create(attachment, emojiName);
};

const deleteGuildEmoji: (payload: {
	emojiName: string;
	guild: Guild;
}) => Promise<void> = async ({ emojiName, guild }) => {
	const emojiId = getEmojiId(emojiName);

	const emoji = await guild.emojis.fetch(emojiId);

	emoji.delete('we dont want this here');
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
		const guild = msg.guild!;

		const attachment = msg.attachments.first();

		if (!attachment) {
			if (isEmoji(args[0])) {
				try {
					await deleteGuildEmoji({ emojiName: args[0], guild });

					msg.channel.send('Emoji deleted!');

					return;
				} catch (err) {
					throw ERR_DELETE_GUILD_EMOJI;
				}
			}

			throw ERR_NO_ATTACHMENT;
		}

		try {
			await createGuildEmoji({
				attachment: attachment.url,
				emojiName: args[0],
				guild
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
