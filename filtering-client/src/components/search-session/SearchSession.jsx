import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from 'common/dropdown-menu';
import InputBox from 'common/input-box';
import DeleteButton from 'common/delete-button';
import './search-session.scss';

const propTypes = {
	sessionType: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	removeFilter: PropTypes.func.isRequired,
	handleOutputChange: PropTypes.func.isRequired,
	updateFilterList: PropTypes.func.isRequired
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
				{value:"contains", label: "contains"},
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
			output: {},
			min: '',
			max: '',
			input: '',
			isFirstSelected: false,
			isNumber: false,
			isRange: false
		}
	}

	handleQuerySelectChange = (e, key) => {
		const { value } = e.target;
		const { index } = this.props;

		let filterData = this.props.sessionType.filter(ty => ty.value === value)[0];
		let query = { "query": value};
		this.setState({ output: query, input: '', min: '', max: '', value, isRange: false});

		let handleQuerySelectChange = this.props.sessionType.filter(el => {
			return el.value == value;
		});
		
		this.props.updateFilterList(handleQuerySelectChange, index);
		this.props.handleOutputChange(query,index);
		
		if (filterData.type === "string") {
			this.setState({ isFirstSelected: true, isNumber: false });
		} else if (filterData.type === "number") {
			this.setState({ isFirstSelected: true, isNumber: true });
		}
	}

	handleTypeSelectChange = (e,key) => {
		const { value } = e.target;
		const { output } = this.state;
		const { index } = this.props;
		let query = { "query": output.query };
		query.value = null;
		query[key] = value;
		

		if (value === "range"){
			query.min = null;
			query.max = null;
			this.setState({ output: query, input: '', min: '', max: '', isRange: true});
		} else {
			this.setState({ output: query, input: '', min: '', max: '', isRange: false});
		};

		this.props.handleOutputChange(query,index);

	};
	handleFirstInputChange = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const { output } = this.state;
		const { index } = this.props;
		let input = { ...output};

		this.state.isRange ?
		(
			this.setState(prevState => ({ output: { ...prevState.output, min: value }, min:value})),
			input.min = value,
			delete input.value
		)
			: 
		(
			this.setState(prevState => ({ output: { ...prevState.output, value }, input:value})),
			input.value = value
		);

		this.props.handleOutputChange(input, index);
	}
	handleSecondInputChange = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const { output } = this.state;
		const { index } = this.props;
		let input = { ...output};
		input.max = value;
		delete input.value;

		this.setState(prevState => ({ output: { ...prevState.output, max: value }, max:value}));

		this.props.handleOutputChange(input,index);
	}
	renderTypeFilterDropdown = () => {
		return this.state.isNumber ? 
			<DropdownMenu filters={this.state.sessionNumber} onChange={e => this.handleTypeSelectChange(e,"number")} type="number" />
			: <DropdownMenu filters={this.state.sessionString} onChange={e => this.handleTypeSelectChange(e,"string")} type="string" />;
	};
	renderInputBox = () => {
		return this.state.isRange ?
		<Fragment>
			<InputBox input={this.state.min} onChange={this.handleFirstInputChange} />
			<InputBox input={this.state.max} onChange={this.handleSecondInputChange} />
		</Fragment>
		: <InputBox input={this.state.input} onChange={this.handleFirstInputChange} />
	};
	handleDeleteFilter = (e) => {
		e.preventDefault();
		const { index } = this.props;
		const { output } = this.state;
		this.props.removeFilter(index,output);		
	}
	renderDeleteButton = () => {
		return <DeleteButton onClick={this.handleDeleteFilter} index={this.state.index}/>;
	};
	render() {
		const { index } = this.props;
		return (
			<div className={`form-control ${ (index > 0 ? 'secondary' : '' ) }`}>
				{ this.props.index > 0 && this.renderDeleteButton()}
				<DropdownMenu filters={this.props.sessionType} onChange={this.handleQuerySelectChange} type="query" />
				{ this.state.isFirstSelected && this.renderTypeFilterDropdown()}
				{ this.state.isFirstSelected && this.renderInputBox()}
			</div>
		);
	}
}

SearchSession.propTypes = propTypes
export default SearchSession;