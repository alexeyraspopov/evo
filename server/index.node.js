import Express from 'express';
import Morgan from 'Morgan';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import invariant from 'invariant';
import App from 'components/App';
import {styles, scripts} from './params.node';
import Layout from './layout';

const PORT = process.env.PORT;
const STATIC = process.env.STATIC;
const app = Express();

invariant(PORT, 'Port should be specified by environment variable');
invariant(STATIC, 'Static folder should be specified by environment variable');

app.use(Morgan('common'));
app.use(Express.static(STATIC));

app.get('/*', (request, response) => {
	const markup = ReactDOMServer.renderToString(<App path={request.url} />);
	return response.send(Layout('Evo', styles, scripts, markup));
});

app.listen(PORT);
