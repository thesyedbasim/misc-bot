import { Command } from '../../types/command';

const CUR_DATE = new Date();

const getDateObj = (userRawTime: string) => {
	const getDateInfo = (date: string) => {
		const dateArr = date.split('-');

		if (
			dateArr.length < 3 ||
			!Number.isInteger(+dateArr[0]) ||
			!Number.isInteger(+dateArr[1]) ||
			!Number.isInteger(+dateArr[2])
		) {
			return;
		}

		const dateInfo = {
			date: +dateArr[0],
			month: +dateArr[1],
			year: +dateArr[2]
		};

		return dateInfo;
	};

	const getTimeInfo = (time: string) => {
		const timeArr = time.split(':');

		if (
			timeArr.length < 1 ||
			!Number.isInteger(+timeArr[0]) ||
			!Number.isInteger(+timeArr[1])
		) {
			return;
		}

		const timeInfo = {
			hour: +timeArr[0],
			minute: +timeArr[1]
		};

		return timeInfo;
	};

	const timeDate = userRawTime.split('::');

	const timeInfo = getTimeInfo(timeDate[0]);
	const dateInfo = getDateInfo(
		timeDate[1] ||
			`${CUR_DATE.getDate()}-${CUR_DATE.getMonth()}-${CUR_DATE.getFullYear()}`
	);

	const dateObj = new Date();

	if (!timeInfo || !dateInfo) {
		return;
	}

	dateObj.setHours(timeInfo.hour);
	dateObj.setMinutes(timeInfo.minute);

	dateObj.setDate(dateInfo.date);
	dateObj.setMonth(dateInfo.month);
	dateObj.setFullYear(dateInfo.year);

	return dateObj;
};

export default new Command(
	{
		alias: ['remind', 'r'],
		description:
			'Get a ping at the specified time to remind yourself. This command is still in progress.',
		syntax: '<time to ping> <?reminder>',
		numArgs: { min: 1, max: 1 },
		missingArgs: 'Please specify the time to ping',
		areNotArgsLowerCase: true
	},
	({ msg, args, query }) => {
		console.log('msg', msg);
		console.log('args', args);

		query = query.split(' ').slice(1).join(' ');
		console.log('query', query);

		const dateObj = getDateObj(args[0]);

		if (!dateObj) {
			return;
		}

		let reminderReply = `You will get a ping at ${dateObj.getHours()}:${dateObj.getMinutes()} on ${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`;

		msg.reply(reminderReply);

		msg.channel.send(
			'btw this command is still in progress so u wont get reminded kekw'
		);
	}
);
