var express = require("express");
var trafficLight = require('./TrafficLight.js');

const app = express();

app.get('/start', (req, res) => {
	trafficLight.startSimulation();
	return res.send('Simulation is started');
});

app.get('/stop', (req, res) => {
	trafficLight.stopSimulation();
	return res.send('Simulation is terminated');
});

app.get('/state', (req, res) => {
	return res.send(JSON.stringify(trafficLight.state));
});

app.listen(3005, () => {
	console.log('Example app listening on port 3005!');
});