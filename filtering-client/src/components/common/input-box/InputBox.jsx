import React from 'react';
import './input-box.scss';

const InputBox = ({input, onChange}) => {
	return (
		<input className="input-box" value={input} onChange={e => onChange(e)}></input>
	)
}

export default InputBox;