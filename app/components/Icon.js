import React from 'react';

export default function Icon({type, className = ''}) {
	return <span className={`material-icons ${className}`}>{type}</span>;
}
