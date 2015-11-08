export function parse(pattern, path) {
	const keys = pattern.match(/(\:|\*)([^\/\?]+)/g) || [];
	const regex = regexify(pattern);

	if (!regex.test(path)) {
		return {path};
	}

	const results = path.match(regex).slice(1);
	const params = keys
		.map(key => key.slice(1))
		.reduce((acc, key, index) => ({[key]: results[index], ...acc}), {});

	return {params, path};
}

export function matches(patterns, path) {
	return Object.keys(patterns)
		.map(route => ({route, regex: regexify(route), callback: patterns[route]}))
		.filter(route => route.regex.test(path));
}

function regexify(pattern) {
	const regexp = pattern
		.replace(/[\/]+/g, '/')
		.replace(/\/?$/, '/?')
		.replace(/\:[^\/\?]+(\?)?/g, '$1([^/]+)$1')
		.replace(/\*[^\/\?]+(\?)?/g, '$1(.+)$1');

	return new RegExp(`^${regexp}$`);
}
