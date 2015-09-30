import Express from 'express';
import React from 'react';
import App from './app/components/App';

// TODO: all env variables should be determined in Makefile
const PORT = 3000;
const VENDOR = 'vendor.js'; // or vendor.f43ed.js
const BUNDLE = 'bundle.js'; // or bundle.83bc1.js
const app = Express();

const styles = [];
const scripts = [VENDOR, BUNDLE];

app.use(Express.static('./dist'));

console.log(process.env.NODE_ENV);

app.get('/', (request, response) => {
	response.send(`
<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8">
	<title>Evo</title>
	${styles.map(href => `<link rel="stylesheet" href="${href}">`).join('')}
</head>
<body>
	<main>${React.renderToString(<App />)}</main>
	${scripts.map(src => `<script src="${src}"></script>`).join('')}
</body>
</html>
	`);
});

app.listen(PORT);
