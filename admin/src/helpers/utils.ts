/** Create chart-digestable data with the option of limiting categories */
export const formatChartData = (store, model: string[], { sort = false, limit = Infinity } = {}): { categories: any[], data: any[] } => {
	let data = store;
	for (let modelKey of model) {
		if (!Reflect.has(data, modelKey)) return { categories: [], data: [] };

		data = data[modelKey];
	}

	let keys = Object.keys(data);

	let otherSum = 0;
	if (limit < keys.length) {
		// If there's an "other" key in the dataset, remove it and group it with the smallest keys
		let otherIndex = keys.findIndex(key => key.toLowerCase() === 'other');
		if (otherIndex !== -1) {
			otherSum = data[keys[otherIndex]];
			keys.splice(otherIndex, 1);
		}
	}

	if (sort) {
		// Sort in ascending order if needed
		keys = keys.sort((a, b) => data[b] - data[a]);
	}

	let categories = keys.slice(0, limit);
	let series = categories.map(category => data[category]);

	if (limit < keys.length) {
		categories.push('Other');
		otherSum = keys.slice(limit, keys.length).reduce((acc, key) => acc += data[key], otherSum);
		series.push(otherSum);
	}

	return { categories, data: series };
}