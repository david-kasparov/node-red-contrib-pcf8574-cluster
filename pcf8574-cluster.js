module.exports = function(RED) {
  "use strict";
  const PCF8574Cluster = require('pcf8574cluster');
  const i2cBus = require('i2c-bus').openSync(1);

  let cluster;

  function ClusterNode(config) {
    RED.nodes.createNode(this, config);

    config = {
      params: {
        addresses: [0x20],
        initial_states: [true],
        output_pins: [1,2]
      }
    };

    var node = this;

    node.log(config);

    node.cluster = new PCF8574Cluster(i2cBus, config.params.addresses, config.params.initial_states);

    let outputPins = [];

    config.params.output_pins.forEach(outputPin => {
      outputPins.push(node.cluster.outputPin(outputPin, true, false));
    });

    Promise.all(outputPins)
    .then(() => {
      cluster = node.cluster;

      node.log(cluster, 'cluster');
    });

    node.cluster.on('input', function(msg) {
      node.send(msg);
    });

    node.on('input', function(msg) {
      node.send(msg);
    });
  }

  RED.nodes.registerType("cluster", ClusterNode);



  function SetPinNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on('input', function(msg) {
      var pin = msg.pin || 1;
      var value = msg.value || false;
      cluster.setPin(pin, value);

      node.log(cluster, 'set pin');

      node.send(msg);
    });
  }

  RED.nodes.registerType("set-pin", SetPinNode);
}
