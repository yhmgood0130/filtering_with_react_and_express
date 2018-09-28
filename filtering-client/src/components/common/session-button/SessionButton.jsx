import React from 'react';

const SessionButton = ({label, onChange}) => (
	<button onClick={onChange}>{label}</button>
);

export default SessionButton;