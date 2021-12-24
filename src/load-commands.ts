import { join } from 'path';
import { readdirSync } from 'fs';

import { commandsList, commandsListRaw } from './assets/commands-list';
import { CategoryInfo } from './types/category';
import { Command } from './types/command';

export const loadCommands = async () => {
	for (const categoryName of readdirSync(join(__dirname, 'commands'))) {
		const categoryCommands: Command[] = [];
		const categoryDisplayName = (
			(await import(`./commands/${categoryName}`)).default as CategoryInfo
		).name;

		for (const commandFileName of readdirSync(
			join(__dirname, 'commands', categoryName)
		)) {
			if (commandFileName === 'index.ts' || commandFileName === 'index.js')
				continue;

			categoryCommands.push(
				(await import(`./commands/${categoryName}/${commandFileName}`))
					.default as Command
			);
		}

		commandsList.set(categoryDisplayName, categoryCommands);
		commandsListRaw.push(...categoryCommands);
	}
};
