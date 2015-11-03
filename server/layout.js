export default function Layout(title, styles, scripts, content) {
	return `
<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8">
	<title>${title}</title>
	${styles.map(href => `<link rel="stylesheet" href="/${href}">`).join('')}
</head>
<body>
	<main>${content}</main>
	${scripts.map(src => `<script src="/${src}"></script>`).join('')}
</body>
</html>
	`;
}
