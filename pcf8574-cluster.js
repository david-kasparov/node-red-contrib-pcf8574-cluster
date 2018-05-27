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

    //node.warn(config);

    node.cluster = new PCF8574Cluster(i2cBus, config.params.addresses, config.params.initial_states);

    node.cluster.outputPin(1, true, false)
    .then(() => {
      return node.cluster.outputPin(2, true, false);
    })
    .then(() => {
      return node.cluster.setAllPins(true);
    })
    .then(() => {
      return node.cluster.getPinValue(1);
    })
    .delay(2000)
    .then(() => {
      return node.cluster.setAllPins(false);
    })
    .then(() => {
      return node.cluster.getPinValue(1);
    });

    let outputPins = [];

    config.params.output_pins.forEach(outputPin => {
      outputPins.push(node.cluster.outputPin(outputPin, true, false));
    });

    Promise.all(outputPins)
    .then(() => {
      cluster = node.cluster;

      node.warn('cluster');
      node.warn(cluster);
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

      node.warn('set pin');
      node.warn(cluster);

      /*cluster.outputPin(1, true, false)
      .then(() => {
        return cluster.outputPin(2, true, false);
      })
      .then(() => {*/
      cluster.setAllPins(true)
      .then(() => {
        return cluster.getPinValue(1);
      })
      .delay(2000)
      .then(() => {
        return cluster.setAllPins(false);
      })
      .then(() => {
        return cluster.getPinValue(1);
      });

      node.send(msg);
    });
  }

  RED.nodes.registerType("set-pin", SetPinNode);
}
