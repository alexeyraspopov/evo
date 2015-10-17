import Express from 'express';
import Morgan from 'Morgan';
import React from 'react';
import App from '../app/components/App';
import {styles, scripts} from './params.node';
import Layout from './layout';

const PORT = process.env.PORT || throwError('Port should be specified by environment variable');
const STATIC = process.env.STATIC || throwError('Static folder should be specified by environment variable');
const app = Express();

app.use(Morgan('common'));
app.use(Express.static(STATIC));

app.get('/*', (request, response) => response.send(Layout('Evo', styles, scripts, React.renderToString(<App />))));

app.listen(PORT);

function throwError(msg) {
	throw new Error(msg);
}
