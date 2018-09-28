import React from 'react';
import './session-button.scss';

const SessionButton = ({label, onChange}) => (
	<button className="primary-button" onClick={onChange}>{label}</button>
);

export default SessionButton;