export function parse(pattern, path) {
	const keys = pattern.match(/(\:|\*)([^\/\?]+)/g) || [];

	const regex = regexify(pattern);

	if (!regex.test(path)) {
		return {path};
	}

	const results = path.match(regex).slice(1);

	const params = keys
		.map(key => key.slice(1))
		.reduce((params, key, index) => ({[key]: results[index], ...params}), {});

	return {params, path};
}

function regexify(pattern) {
	const regexp = pattern
		.replace(/[\/]+/g, '/')
		.replace(/\/?$/, '/?')
		.replace(/\:[^\/\?]+(\?)?/g, '$1([^/]+)$1')
		.replace(/\*[^\/\?]+(\?)?/g, '$1(.+)$1');

	return new RegExp(`^${regexp}$`);
}
