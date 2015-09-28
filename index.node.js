import Express from 'express';
import React from 'react';
import App from './app/components/App';

const PORT = 3000;
const VENDOR = 'vendor.js'; // or vendor.f43ed.js
const BUNDLE = 'bundle.js'; // or bundle.83bc1.js
const app = Express();

app.use(Express.static('./dist'));

app.get('/', (request, response) => {
	response.send(`
<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8">
	<title>Evo</title>
</head>
<body>
	<main>${React.renderToString(<App />)}</main>
	<script src="${VENDOR}"></script>
	<script src="${BUNDLE}"></script>
</body>
</html>
	`);
});

app.listen(PORT);
