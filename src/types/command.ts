import { Interaction, Message } from 'discord.js';
import { ServerError } from './serverError';
import { UserError } from './userError';

export interface CommandExecutePayload {
	msg: Message;
	args: string[];
	query: string;
}

export type CommandExecuteHandler = (
	payload: CommandExecutePayload
) => Promise<void> | void;

export class Command {
	constructor(
		readonly payload: {
			readonly alias: string[];
			readonly description: string;
			readonly syntax: string;
			readonly numArgs: { min: number; max: number | null };
			readonly isAsync?: boolean;
			readonly missingArgs?:
				| string
				| ((payload: { msg: Message; args: string[] }) => string);
		},
		private execute: CommandExecuteHandler,
		readonly interactionsHandler?: {
			[key: string]: (payload: { interaction: Interaction }) => any;
		}
	) {}

	run: (payload: { msg: Message }) => Promise<void> = async ({ msg }) => {
		const args = msg.content.split(process.env.PREFIX!)[1].split(' ').slice(1);
		let query = args.join(' ');

		if (args.length < this.payload.numArgs.min && this.payload.missingArgs) {
			if (typeof this.payload.missingArgs === 'function') {
				msg.reply(this.payload.missingArgs({ msg, args }));

				return;
			}

			msg.reply(this.payload.missingArgs);

			return;
		}

		if (this.payload.numArgs.max === null) {
			query = args.slice(this.payload.numArgs.min - 1).join(' ');
		}

		try {
			if (this.payload.isAsync) {
				await this.execute({ msg, args, query });
			} else {
				this.execute({ msg, args, query });
			}
		} catch (err) {
			if (err instanceof UserError) {
				msg.reply(err.message);

				return;
			}

			if (err instanceof ServerError) {
				console.error('SERVER ERROR', err);

				msg.reply(err.message);

				return;
			}

			console.error('UNKNOWN ERROR', err);
		}
	};
}
