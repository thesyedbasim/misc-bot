import { ERR_CHANGE_NICKNAME } from '../assets/errors';
import { Command } from '../types/command';

export default new Command(
	{
		alias: ['nickname', 'nick', 'nickd'],
		description: 'Easily change nicknames of members in the servers.',
		syntax: '<?member tag> <new nickname>',
		numArgs: { min: 1, max: null },
		areNotArgsLowerCase: true,
		missingArgs: 'please specify member tag and new nickname',
		isAsync: true
	},
	async ({ msg, query, aliasUsed }) => {
		const memberToSetNickname = msg.mentions.members?.first() || msg.member;

		const newNickname = query.split(' ').slice(1).join(' ') || query;

		try {
			memberToSetNickname?.setNickname(newNickname);
		} catch {
			throw ERR_CHANGE_NICKNAME;
		}

		if (aliasUsed === 'nickd') {
			try {
				msg.delete();
			} catch {
				return;
			}
		}
	}
);
