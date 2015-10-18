import React from 'react';
import Greeting from 'components/Greeting';

export default function App({path}) {
	return <Greeting name={"Ann"+path} />;
}
