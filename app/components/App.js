import React from 'react';
import Header from 'components/Header';
import Greeting from 'components/Greeting';

export default function App({path}) {
	// TODO: path -> params
	return (
		<div>
			<Header />
			<Greeting name={`Ann ${path}`} />;
		</div>
	);
}
