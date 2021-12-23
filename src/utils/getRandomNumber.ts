export const getRandomNumber: (min: number, max: number) => number = (
	min,
	max
) => Math.floor(Math.random() * (max - min) + min);
