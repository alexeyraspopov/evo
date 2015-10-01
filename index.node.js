import Express from 'express';
import React from 'react';
import App from './app/components/App';
import Params from './params.node';

const PORT = process.env.PORT || 3000;
const app = Express();

app.use(Express.static('./dist'));

app.get('/', (request, response) => {
	response.send(`
<!doctype html>
<html lang="en-us">
<head>
	<meta charset="utf-8">
	<title>${Params.title}</title>
	${Params.styles.map(href => `<link rel="stylesheet" href="${href}">`).join('')}
</head>
<body>
	<main>${React.renderToString(<App />)}</main>
	${Params.scripts.map(src => `<script src="${src}"></script>`).join('')}
</body>
</html>
	`);
});

app.listen(PORT);
