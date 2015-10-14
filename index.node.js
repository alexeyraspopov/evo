import Express from 'express';
import Morgan from 'Morgan';
import React from 'react';
import App from './app/components/App';
import {styles, scripts} from './params.node';
import Layout from './layout';

const PORT = process.env.PORT || 3000;
const app = Express();

app.use(Express.static('./dist'));
app.use(Morgan('dev'));

app.get('/', (request, response) => response.send(Layout('Evo', styles, scripts, React.renderToString(<App />))));

app.listen(PORT);
