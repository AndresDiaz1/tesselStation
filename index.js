var tessel = require('tessel');
var Device = require('losant-mqtt').Device;

var device = new Device({
    id: '57a3d9bf9696280100b93210',
    key: '0aab835c-39b6-47f3-b75a-35d0b4080cdd',
    secret: 'dd77bb44b31fb51d606e7d5ad90200f9613f9e5bd2f4c64d7faed1ed06d6fdef'
});

var readInterval = null;

device.connect();

device.on('connect', () => {
    console.log('Conexión exitosa a Losant');
    setInterval(startReporting, 1000);

    device.once('offline', stopReporting);
    device.once('error', stopReporting);
    device.once('close', stopReporting);
});


device.on('command', (command) => {

    toggleLights(command);

    console.log('Command received.');
    console.log(command.name);
    console.log(command.payload);
});

function startReporting() {
    var variableLuz = Math.round(Math.random() * 10) + 1;
    var variableTemperatura = Math.round(Math.random() * 10) + 1;
    var variableHumedad = Math.round(Math.random() * 10) + 1;
    device.sendState({
        Luz: variableLuz,
        Temperatura: variableTemperatura,
        Humedad: variableHumedad
    });
}

function stopReporting() {

}

function toggleLights(command) {
    command.payload.isLighted == true ? tessel.led[0].on() : tessel.led[0].off();
}
