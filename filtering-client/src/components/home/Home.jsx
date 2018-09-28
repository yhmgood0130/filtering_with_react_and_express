import React, { Fragment, Component } from 'react';
import axios from 'axios';
import SearchSession from '../search-session';
import SessionButton from 'common/session-button';
import './Home.scss';

class Home extends Component {
	constructor() {
		super();

		this.state = {
			sessionType: [],
			filterList: [ "id" ],
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
			url: 'http://localhost:3000/api/v1/filtering/filters'
		}).then(res => {
			let arr = []
			arr.push(res.data[0].value);
			this.setState({ sessionType: res.data, filterList: arr });
		});
	};

	renderSession = () => {
		const { filterList } = this.state;
		let arr = [...filterList];
		if (filterList.length > 0) {
			filterList.forEach((el,index) => {
				console.log(filterList);
				
				arr.push(<SearchSession key={index} value={el} sessionType={this.state.sessionType} removeFilter={this.removeFilter} />);
			});
		}
		return arr; 
	}

	addFilter = () => {
		const { index, sessionType } = this.state;
		let arr = new Array(...sessionType);
		this.setState(prevState => ({ filterList: [...prevState.filterList, arr[index + 1].value], index: index + 1 }));
	}

	removeFilter = (index) => {
		this.setState((prevState) => ({filterList: prevState.filterList.filter(filter => filter.index != index)}));
	}

	submitFilters = () => {
		console.log("HELLO");
		
	}

	render() {
		return (
		<div className="home-container">
			<div className="home-title">SEARCH FOR SESSIONS</div>
			<hr />
			<div className="home-session">
				{this.renderSession()}
			</div>
			<SessionButton onChange={this.addFilter} label="AND" />
			<div className="home-footer">
				<SessionButton onChange={this.submitFilters} label="SEARCH" />
			</div>
		</div>
		);
	}
}

export default Home;