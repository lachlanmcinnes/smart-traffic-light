//List Requirements
const awsIot = require('aws-iot-device-sdk')

//Establish Device
const device = awsIot.device({
	certPath: '3f7816990d-certificate.pem.crt',
	keyPath: '3f7816990d-private.pem.key',
	caPath: 'AmazonRootCA1.pem',
	clientId: 'lachlan',
	host: 'a1xk7thsjhw39b-ats.iot.us-east-1.amazonaws.com'
});

//Traffic Light Code
let state = {state:'RED', numberOfCars:6};
let isConnected=false;
let timeout=null;

function randomInt(low, high) {
	return Math.floor(Math.random() * (high-low) + low)
}

function startSimulation(){
	if(isConnected){
		simulateCars();
	}else{
		setTimeout(startSimulation, 1000);
		console.log('not connected');
	}
}

function stopSimulation(){
	clearTimeout(timeout);
}

function simulateCars(){
	console.log(state);
	state.numberOfCars = Math.max(0, state.numberOfCars + (state.state === 'Red' ? 1 : -1) * randomInt(1,5));
	device.publish('NumberOfCars', JSON.stringify(state));
	timeout = setTimeout(simulateCars, 5000);
}

startSimulation();

//Action for device
device
	.on('connect', () => {
		console.log('connected');
		isConnected=true;
		device.subscribe('ChangeState');
	}
);
device
	.on('message', (topic, payload) => {
		state.state = state.state === 'RED' ? 'GREEN' : 'RED';
		console.log('message', topic, payload.toString());
	}
);


