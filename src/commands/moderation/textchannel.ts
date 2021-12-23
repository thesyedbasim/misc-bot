import {
	CategoryChannel,
	DiscordAPIError,
	Guild,
	TextChannel
} from 'discord.js';
import { ERR_CHANNEL_CREATE } from '../../assets/errors';
import { Command } from '../../types/command';

const createChannel: (payload: {
	channelName: string;
	guild: Guild;
}) => Promise<TextChannel> = async ({ channelName, guild }) =>
	guild.channels.create(channelName);

const createCategory: (payload: {
	categoryName: string;
	guild: Guild;
}) => Promise<CategoryChannel> = async ({ categoryName, guild }) =>
	guild.channels.create(categoryName, { type: 'GUILD_CATEGORY' });

const searchCategory: (payload: {
	categoryName: string;
	guild: Guild;
}) => CategoryChannel | undefined = ({ categoryName, guild }) =>
	guild.channels.cache.find(
		(channel) =>
			channel.name.toLowerCase() === categoryName.toLowerCase() &&
			channel.type === 'GUILD_CATEGORY'
	) as CategoryChannel | undefined;

export default new Command(
	{
		alias: ['textchannel', 'tchannel', 'tch', 'ch'],
		description:
			'Quickly and easily create text channels and categories in the server.',
		numArgs: { min: 1, max: null },
		syntax: '<text channel name> <?category name>',
		isAsync: true,
		missingArgs: 'Please specify the channel name to create.'
	},
	async ({ msg, args }) => {
		const guild = msg.guild!;
		const [channelName, categoryName] = args;

		let channel: TextChannel;

		try {
			channel = await createChannel({ channelName, guild });
		} catch (err) {
			if (err instanceof DiscordAPIError) throw ERR_CHANNEL_CREATE;
		}

		if (categoryName) {
			const category =
				searchCategory({ categoryName: args.slice(1).join(' '), guild }) ||
				(await createCategory({
					categoryName: args.slice(1).join(' '),
					guild
				}));

			channel!.setParent(category);

			msg.channel.send(
				`Channel \`${channel!.name}\` successfully created in \`${
					category.name
				}\` category by ${msg.author.toString()}`
			);

			return;
		}

		msg.channel.send(
			`Channel \`${
				channel!.name
			}\` successfully created by ${msg.author.toString()}`
		);
	}
);
