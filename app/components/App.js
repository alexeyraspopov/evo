import React from 'react';
import Greeting from 'components/Greeting';

export default function App({path}) {
	// TODO: path -> params
	return <Greeting name={`Ann ${path}`} />;
}
