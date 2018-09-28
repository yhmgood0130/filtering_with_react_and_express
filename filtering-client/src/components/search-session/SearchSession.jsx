import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'common/dropdown-menu';
import InputBox from 'common/input-box';
import DeleteButton from 'common/delete-button';
import './search-session.scss';

const propTypes = {
	sessionType: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	removeFilter: PropTypes.func.isRequired
};

class SearchSession extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sessionType: [],
			sessionString: [ 
				{value:"starts_with", label: "starts with"},
				{value:"not_start_with", label: "does not start with"},
				{value:"equals", label: "equals"},
				{value:"not_equal", label: "does not equal"},
				{value:"contains", label: "starts with"},
				{value:"not_contain", label: "does not contain"},
				{value:"in_list", label: "in list"},
				{value:"not_in_list", label: "does not in list"}
			],
			sessionNumber: [ 
				{value:"range", label: "range"},
				{value:"less_equal", label: "equal or less than"},
				{value:"equals", label: "equals"},
				{value:"not_equal", label: "does not equal"},
				{value:"greater_equal", label: "equal or greater than"},
				{value:"not_contain", label: "does not contain"}
			],
			output: '',
			min: '',
			max: '',
			input: '',
			isFirstSelected: false,
			isNumber: false,
			isRange: false
		}
	}

	handleSelectChange = (e, key) => {
		const { value } = e.target;

		let filterDataType = this.props.sessionType.filter(ty => ty.value === value)[0];
		
		this.setState(prevState => ({ output: { ...prevState.output, [key]:value, "value": null}, input: '', min: '', max: '', isRange: false}));
		if (filterDataType.type === "string") {
			this.setState({ isFirstSelected: true, isNumber: false });
		} else if (filterDataType.type === "number") {
			this.setState({ isFirstSelected: true, isNumber: true });
		}
	}

	handleSecondSelectChange = (e,key) => {
		const { value } = e.target;

		if (value === "range"){
			this.setState(prevState => ({ output: { ...prevState.output, [key]:value, "value": null}, input: '', min: '', max: '', isRange: true}));
		} else {
			this.setState(prevState => ({ output: { ...prevState.output, [key]:value, "value": null}, input: '', min: '', max: '', isRange: false}));
		}

	};
	handleInputChange = (e) => {
		e.preventDefault();
		const { value } = e.target;

		this.state.isRange ?
			this.setState(prevState => ({ output: { ...prevState.output, min: value }, min:value}))
			: this.setState(prevState => ({ output: { ...prevState.output, value }, input:value}));
	}
	handleSecondInputChange = (e) => {
		e.preventDefault();
		const { value } = e.target;

		this.setState(prevState => ({ output: { ...prevState.output, max: value }, max:value}));
	}
	renderFilter = () => {
		return this.state.isNumber ? 
			<DropdownMenu filters={this.state.sessionNumber} onChange={this.handleSecondSelectChange} type="string" />
			: <DropdownMenu filters={this.state.sessionString} onChange={this.handleSecondSelectChange} type="number" />;
	};
	renderValueInput = () => {
		return this.state.isRange ?
		<Fragment>
			<InputBox input={this.state.min} onChange={this.handleInputChange} />
			<InputBox input={this.state.max} onChange={this.handleSecondInputChange} />
		</Fragment>
		: <InputBox input={this.state.input} onChange={this.handleInputChange} />
	};
	handleClick = (e) => {
		e.preventDefault();
		const { index } = this.state;
		this.props.removeFilter(index);
	}
	renderDeleteButton = () => {
		return <DeleteButton onClick={this.handleClick} index={this.state.index}/>;
	};
	render() {
		return (
			<form className="form-control">
				{ this.props.index > 0 && this.renderDeleteButton()}
				<DropdownMenu filters={this.props.sessionType} onChange={this.handleSelectChange} type="query" />
				{this.state.isFirstSelected && this.renderFilter()}
				{this.state.isFirstSelected && this.renderValueInput()}
			</form>
		);
	}
}

SearchSession.propTypes = propTypes
export default SearchSession;