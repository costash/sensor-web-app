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

  * A dozen Male-Male Jumper cables

<img src="http://ecx.images-amazon.com/images/I/61r8caEploL._SL1001_.jpg" alt="jumper cables" height="200px" />

  * [Methane Gas sensor MQ-4](http://electronics.semaf.at/Methane-Gas-Sensor-MQ-4)

<img src="http://electronics.semaf.at/bilder/produkte/gross/Methane-Gas-Sensor-MQ-4.jpg" alt="methane gas sensor mq-4" height="200px"/>

  * 1 * Temperature sensor LM335Z

<img src="http://www.tandyonline.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/m/lm335.png" alt="Temperature sensor LM335Z" height="200px"/>

  * 1 * 2kΩ resistor (I used a 2k2 one successfully as well) for the connection with the temperature sensor
  * 1 * 4GB or more microSD card (Intel Galileo supports up to 32GB cards) for storing the linux image
    * A microSD card reader, a phone, or anything that can be used to write the contents of the microSD card
  * 1 * microUSB cable for connecting to the board

## Putting components together and wiring them up
TODO

## Software architecture
TODO

## Project outcome
This is how the webpage looks like after a couple seconds of reading data from the sensors.
<img src="https://www.dropbox.com/s/1ia4gcswatskk8k/Screenshot%202015-06-25%2012.37.51.png?dl=1" alt="Webpage screenshot" height="400px" />
