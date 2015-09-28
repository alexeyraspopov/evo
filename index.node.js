import Express from 'express';
import React from 'react';
import App from './app/components/App';

const PORT = 3000;
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
	<script src="vendor.js"></script>
	<script src="bundle.js"></script>
</body>
</html>
	`);
});

app.listen(PORT);
