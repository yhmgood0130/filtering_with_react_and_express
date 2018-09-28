import React from 'react';
import './dropdown-menu.scss';

const DropdownMenu = ({filters, onChange, type}) => {	
	return (
		<select className="dropdown" onChange={e => onChange(e,type)}>
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