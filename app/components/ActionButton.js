import React from 'react';
import Icon from 'components/Icon';

export default function ActionButton({type, className = '', onClick}) {
	return (
		<button className={`action-button ${className}`} onClick={onClick}>
			<Icon type={type} />
		</button>
	);
}
