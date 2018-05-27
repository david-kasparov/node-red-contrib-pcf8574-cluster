'use strict';

const PCF8574Cluster = require('pcf8574cluster');
const i2cBus = require('i2c-bus').openSync(1);

function init(RED) {
  let cluster;

  function ClusterNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.cluster = new PCF8574Cluster(i2cBus, config.params.addresses, config.params.initial_states);

    let outputPins = [];

    config.params.output_pins.forEach(outputPin => {
      outputPins.push(node.cluster.outputPin(outputPin, true, false));
    });

    Promise.all(outputPins)
    .then(() => {
      cluster = node.cluster;
    });

    node.on('input', function(msg) {
      node.send(msg);
    });

    node.cluster.on('input', function(msg) {
      node.send(msg);
    });
  }

  RED.nodes.registerType("cluster", ClusterNode);



  function SetPinNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on('input', function(msg) {
      cluster.setPin(msg.pin, msg.value);
    });
  }

  RED.nodes.registerType("set-pin", SetPinNode);
}

module.exports = init;
