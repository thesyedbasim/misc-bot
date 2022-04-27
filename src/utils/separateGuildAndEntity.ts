export const separateGuildAndEntity = (raw: string, splitter = '-') => {
	return raw.split(splitter);
};
