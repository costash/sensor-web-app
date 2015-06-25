# sensor-web-app
Node.js server and client for interacting with sensor data from Intel Galileo Gen 2 board

## Introduction
This is a hardware project and this code is designed to work with this specific hardware. Some parts can be reused, but I do not guarantee that they will work.

First, I will present the project idea, then the list of hardware components needed for it to work, and finally, I will describe the functionality of the software attached in this repository.

## Project idea
This project started from the idea of creating a DIY air quality monitor using different air sensors and the Intel Galileo Gen 2 board. The board is the hub of this project, being connected to the sensors and collecting data every 500ms. This data is then published using a Node.js webserver which can be accessed by any client within the same LAN with the board.

When the data exceeds normal thresholds, then an email is sent from the webserver (on the board) to a specified email address. Frequency of emails is set to be no more than one email every 5 minutes.

## Hardware list
  * [Intel Galileo Gen 2](http://www.intel.com/content/www/us/en/embedded/products/galileo/galileo-overview.html)

<img src="http://core0.staticworld.net/images/article/2014/07/galileo-front-2x1-100360692-large.jpg" alt="galileo" /> 
  
  * [A half-size breadboard](http://www.adafruit.com/products/64)

<img src="http://www.adafruit.com/images/970x728/64-00.jpg" alt="breadboard" height="200px" />

  * others (TODO)

## Project outcome
This is how the webpage looks like after a couple seconds of reading data from the sensors.
<img src="https://www.dropbox.com/s/1ia4gcswatskk8k/Screenshot%202015-06-25%2012.37.51.png?dl=1" alt="Webpage screenshot" height="400px" />
