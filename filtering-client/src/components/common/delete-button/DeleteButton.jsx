import React from 'react';
import './delete-button.scss';

const DeleteButton = ({onClick}) => {
	return <button className="delete-button" onClick={onClick}>-</button>;
};

export default DeleteButton;