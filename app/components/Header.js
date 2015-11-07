import React from 'react';
import ActionButton from 'components/ActionButton';

export default function Header() {
	return (
		<header className="header">
			<ActionButton type="menu" />
			<h2 className="header-title">Users</h2>
			<ActionButton type="search" />
			<ActionButton type="more_vert" />
		</header>
	);
}
