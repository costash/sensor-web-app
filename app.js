// The following line provides some hints to JSLint to avoid 
// displaying invalid errors in the IDE
/*jslint node:true,vars:true,bitwise:true */

var PORT = 1337; // Port used for the web server

// Require the MRAA library
var mraa = require('mraa');

var moment = require('moment');
var nodemailer = require('nodemailer');
 
// Print the MRAA library version to the IDE console
console.log('MRAA Library Version: ' + mraa.getVersion());
 
// Temperature sensor connected to Analog pin 0
var temp_pin = new mraa.Aio(0);
// Methane gas sensor connected to Analog pin 1
var gas_pin = new mraa.Aio(1);

var timeMailSent = moment('1970', 'YYYY');

var sendEmail = function(readings) {
  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'galileo.wu.costash@gmail.com',
          pass: 'galileowu'
      }
  });

  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Costash Galileo-WU <galileo.wu.costash@gmail.com>', // sender address
      to: 'costashsrc@gmail.com', // list of receivers
      subject: 'Sensor Data Warning', // Subject line
      text: 'There is something wrong in your room! Current sensor data indicate: Temperature=' + readings.temp + ' degrees Celsius and Gas Voltage=' + readings.gas + ' Volts. Please check your room immediately!' // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);

  });
};

var emailSentInLastMinutes = function() {
  if (moment().subtract(5, 'minutes') < timeMailSent) {
    return true;
  } else {
    return false;
  }
};

var checkReadingsAndSendEmail = function(readings) {
  if ((readings.temp > 28 || readings.gas > 1) && !emailSentInLastMinutes()) {
    timeMailSent = moment();
    sendEmail(readings);
  }
};

/*
Receives a socket to emit voltageUpdate messages with the measured voltage 
between pin A0 and GND. The function sends messages every 500 milliseconds.
*/
function startVoltageNotifications(socket) {
  setInterval(function () {
    var temp_data = temp_pin.read();
    console.log("Analog Pin (A0) Output: " + temp_data);
    //console.log("Checking....");

    var kelvin_temp = temp_data * 0.0048828125 * 100;   // multiply by 5V and divide by 1024 (precision of A/DC)
    var sensor_offset = 5;
    var celsius_temperature = kelvin_temp - sensor_offset - 273.15; // subtract offset degrees error

    console.log("Celsius Temperature: " + celsius_temperature); 

    var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
    //console.log("Fahrenheit Temperature: " + fahrenheit_temperature);

    var gas_data = gas_pin.read();
    console.log("Analog Pin (A1) Output: " + gas_data);
    var voltage_gas_data = gas_data * 0.0048828125;
    console.log('Gas reading in voltage: ' + voltage_gas_data);

    var readings = {temp: celsius_temperature, gas: voltage_gas_data};
    checkReadingsAndSendEmail(readings);
    socket.emit("sensorUpdate", readings);
  }, 500);
}
 
// Create the Socket.io Server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});
 
// Attach many event handlers to the Server
io.on('connection', function (socket) {
    console.log('User connnected');
    // Emit an event with a welcome message
    socket.emit('connected', 'Welcome to the Server!');
     
    // Start emitting events with measured voltages
    startVoltageNotifications(socket);
     
    // Attach an event handler that will be fired when the user disconnects
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
     
    // Attach an event handler that will be fired when the user sends a turnOnboardLEDOn message
    socket.on('turnOnboardLEDOn', function () {
        // Turn on the onboard LED by writing a '1' (high)
        onboardLed.write(1);
        console.log('Onboard LED turned on');
    });
 
    // Attach an event handler that will be fired when the user sends a turnOnboardLEDOff message
    socket.on('turnOnboardLEDOff', function () {
        // Turn off the onboard LED by writing a '0' (low)
        onboardLed.write(0);
        console.log('Onboard LED turned off');
    });
 
});
 
// Start listening at port 1337
http.listen(PORT, function () {
    console.log('Server is listening at port ' + PORT);
});