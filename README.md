# node-red-contrib-pcf8574-cluster
## Description

Control each pin of a PCF8574/PCF8574A/PCF8574P I2C port expander IC with Node-RED ( <http://nodered.org> ).

## Installation

```
$ cd ~/.node-red
$ npm i node-red-contrib-pcf8574-cluster
```

## Nodes

##### - cluster configurator

Configuration node for cluster.

*Configuration:*
- Addresses : Define the addresses of the PCF8574/PCF8574A
- Example : { "addresses": [32, 33] }
- Initial states : Define the initialStates of the PCF8574/PCF8574A
- Example : { "initial_states": [true, true] }
- Interrupts : Define the interrupts of the PCF8574/PCF8574A
- Example : { "interrupts": [{ "index": 1, "pin": 24 }, { "index":2, "pin": 25 }] }

##### - cluster in

Define a pin as an input.

*Configuration:*
- Cluster : Select cluster configuration
- Name : Define name
- Pin : Define input pin
- Inverted : true if this pin should be handled inverted (high=false, low=true)

##### - cluster out

Define a pin as an output.

*Configuration:*
- Cluster : Select cluster configuration
- Name : Define name
- Pin : Define input pin
- Inverted : true if this pin should be handled inverted (high=false, low=true)
- Initiate: The initial value of this pin, which will be set immediatly.

##### - pin value

Returns the current value of a pin.

*Configuration:*
- Cluster : Select cluster configuration
- Name : Define name
- Pin : Define pin which value you want to get.
