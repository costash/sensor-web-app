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
  * [A half-size breadboard](http://www.adafruit.com/products/64)

<img src="http://www.adafruit.com/images/970x728/64-00.jpg" alt="breadboard" height="200px">
  * 
