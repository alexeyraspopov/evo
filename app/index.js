import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from 'components/Greeting';

function App() {
	return <Greeting name='Ann' />;
}

ReactDOM.render(<App />, document.querySelector('main'));
