import React from 'react';
import logo from './logo.svg';
import './App.css';


const fetch = require("node-fetch");

class App extends React.Component {
	
	startSimulation = () =>
	{
		fetch('http://localhost:3005/start')
			.then(response => response.json())
	}
	
	stopSimulation = () =>
	{
		fetch('http://localhost:3005/stop')
			.then(response => response.json())
	}
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
				<input type="button" onClick={this.startSimulation} value={"Start Simulation"}/>
				<input type="button" onClick={this.stopSimulation} value={"Stop Simulation"}/>
				</header>
			</div>
		)
	}
}

export default App;
