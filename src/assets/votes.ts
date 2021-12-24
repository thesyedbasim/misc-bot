import { Message } from 'discord.js';

export let voteMessageRef: Message | undefined;

export const setVoteMessageRef = (voteMessage: Message) => {
	voteMessageRef = voteMessage;
};
