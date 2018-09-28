import React from 'react';
import './dropdown-menu.scss';

const DropdownMenu = ({filters, onChange, type}) => {	
	return (
		<select className="dropdown-menu" onChange={e => onChange(e,type)}>
			<option value=""></option>
			{
				filters.map(filter => (
					<option key={filter.value} value={filter.value} type={filter.type}>
						{filter.label}
					</option>
				))
			}
		</select>
	)
}

export default DropdownMenu;