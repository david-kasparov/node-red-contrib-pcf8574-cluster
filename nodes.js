const Cluster = require("./cluster");

const instances = {};

module.exports = (RED) => {
  function ClusterInNode(n) {
    RED.nodes.createNode(this, n);

    let node = this;
    let clusterConfig = RED.nodes.getNode(n.cluster);

    if (!instances[n.cluster]) {
      instances[n.cluster] = Cluster(clusterConfig);
    }

    const cluster = instances[n.cluster];

    cluster.inputPin(n.pin, n.inverted)
    .then(() => {

    });

    function onClusterInput(msg) {
      let _msg = {
        payload: msg
      };

      let outputPins = JSON.parse(n.outputPins).output_pins;

      _msg.payload.output_pins = outputPins;

      node.send(_msg);
    }

    cluster.on('input', onClusterInput);

    node.on('close', () => {
      cluster.removeListener('input', onClusterInput);

      //node.warn('listeners count on close ' + cluster.listenerCount('input'));
    });
  }

  RED.nodes.registerType("cluster-in", ClusterInNode);



  function ClusterOutNode(n) {
    RED.nodes.createNode(this, n);

    let node = this;
    let clusterConfig = RED.nodes.getNode(n.cluster);

    if (!instances[n.cluster]) {
      instances[n.cluster] = Cluster(clusterConfig);
    }

    const cluster = instances[n.cluster];

    cluster.outputPin(n.pin, n.inverted, n.initialValue)
    .then(() => {

    });

    node.on('input', (msg) => {
      if (msg.output_pins && msg.output_pins.length) {
        if (msg.output_pins.indexOf(n.pin) === -1) {
          return false;
        }
      }

      cluster.setPin(n.pin, msg.payload.value)
      .then(() => {

      });
    });

    node.on('close', () => {

    });
  }

  RED.nodes.registerType("cluster-out", ClusterOutNode);



  function PinValueNode(n) {
    RED.nodes.createNode(this, n);

    let node = this;
    let clusterConfig = RED.nodes.getNode(n.cluster);

    if (!instances[n.cluster]) {
      instances[n.cluster] = Cluster(clusterConfig);
    }

    const cluster = instances[n.cluster];

    node.on('input', (msg) => {
      let pinValue = cluster.getPinValue(n.pin);

      msg.payload.pin_value = pinValue;

      node.send(msg);
    });

    node.on('close', () => {

    });
  }

  RED.nodes.registerType("pin-value", PinValueNode);
};
