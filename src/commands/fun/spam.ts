import { ERR_SPAM_LIMIT_REACHED } from '../../assets/errors';
import { Command } from '../../types/command';

const MAX_TIMES_TO_SPAM = 10;

export default new Command(
	{
		alias: ['spam'],
		description: 'The easiest way to spam messages in the server!',
		syntax: '<?times to spam> <msg>',
		numArgs: { min: 1, max: 1 },
		missingArgs: 'Please specify the message to spam',
		areNotArgsLowerCase: true
	},
	({ msg, args, query }) => {
		if (Number.isNaN(+args[0]) || +args[0] <= 0 || args.length === 1) {
			msg.channel.send(query);

			return;
		}

		if (+args[0] > MAX_TIMES_TO_SPAM) {
			throw ERR_SPAM_LIMIT_REACHED(MAX_TIMES_TO_SPAM);
		}

		query = query.split(' ').slice(1).join(' ');

		for (let i = 1; i <= +args[0]; i++) {
			msg.channel.send(query);
		}
	}
);
