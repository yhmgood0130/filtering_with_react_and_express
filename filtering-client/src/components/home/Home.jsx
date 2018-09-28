import React, { Fragment, Component } from 'react';
import axios from 'axios';
import SearchSession from '../search-session';
import SessionButton from 'common/session-button';
import './Home.scss';

const url = 'http://localhost:3000/api/v1/filtering/filters';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			sessionType: [],
			filterList: [ { value: "id", index: 0} ],
			selectedList: [],
			output: [],
			index: 0
		}
	}
	componentDidMount() {
		this.getSessionType();
	}

	getSessionType = () => {
		axios({
			method: 'get',
			url
		}).then(res => {
			let initialFilterList = [{value: res.data[0].value, index: 0}];
			this.setState({ sessionType: res.data, filterList: initialFilterList });
		});
	};

	renderSession = () => {
		const { filterList } = this.state;
		return filterList.map((el) => {
			return <SearchSession key={el.value} 
					index={el.index} 
					sessionType={this.state.sessionType} 
					updateFilterList={this.updateFilterList}
					removeFilter={this.removeFilter} 
					handleOutputChange={this.handleOutputChange} />;
		});
	}

	addFilter = (e) => {
		e.preventDefault();
		const { index, sessionType } = this.state;
		let sessionTypeList = new Array(...sessionType);
		let incrementIndex = index + 1;
		let filter = sessionTypeList[incrementIndex];
		filter.index = incrementIndex;

		this.setState(prevState => ({ filterList: [...prevState.filterList, filter], index: incrementIndex }));
	}

	updateFilterList = (newFilter, index) => {
		const { filterList } = this.state;
		let updateFilterList = [ ...filterList ];
		let selectedFilterList = filterList.filter(el => {
			return el.index == index;
		});
		let pos = filterList.map((el) => {
			return el.value;
		}).indexOf(selectedFilterList[0].value);
		
		if (selectedFilterList) {
			newFilter[0].index = pos;
			updateFilterList[pos] = newFilter[0];
			this.setState({ selectedList: updateFilterList });
		};		
	}

	removeFilter = (index,value) => {
		const { filterList, output, selectedList } = this.state;
		let removedSelectedList = selectedList.filter(filter => {	
			return filter.index != index;
		});
		
		let removedOutput = output.filter(out => {	
			return out.query != value.query;
		});

		let removedFilterlist = filterList.filter(selected => {	
			return selected.index != index;
		});

		this.setState({filterList:removedFilterlist, output: removedOutput, selectedList: removedSelectedList});
	}

	handleOutputChange = (value,index) => {
		const { output } = this.state;
		let newOutput = [...output];
		let selectedOutput = output.filter((out) => {
			if (out) {
				return out.query == value.query;
			};
		});

		if (selectedOutput.length === 0) {
			newOutput.push(value);
		} else {
			newOutput[index] = value;
		}
		this.setState({output: newOutput});		
	}

	submitFilters = (e) => {
		e.preventDefault();
		let temp = [...this.state.output] ;

		let data = { "queries": temp.filter((el) => {
			return el.hasOwnProperty('value') || el.hasOwnProperty('min');
		})};

		axios({
			method: 'post',
			url,
			data			
		})
	}

	render() {
		return (
		<div className="home-container">
			<div className="home-title">SEARCH FOR SESSIONS</div>
			<hr />
			<form className="home-session">
				{this.renderSession()}
				<div className="and-button">
					<SessionButton onChange={this.addFilter} label="AND" />
				</div>
				<div className="home-footer">
					<SessionButton onChange={this.submitFilters} label="SEARCH" />
				</div>
			</form>
		</div>
		);
	}
}

export default Home;