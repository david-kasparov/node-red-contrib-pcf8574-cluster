const Cluster = require("./cluster");

const instances = {};

module.exports = (RED) => {

  function PinValueNode(n) {
      RED.nodes.createNode(this, n);

      let node = this;
      let clusterConfig = RED.nodes.getNode(n.cluster);

      if (!instances[n.cluster]) {
        instances[n.cluster] = Cluster(clusterConfig);
      }

      const cluster = instances[n.cluster];

      node.on('input', (msg) => {
        msg.payload.pin_value = cluster.getPinValue(n.pin);

        node.send(msg);
      });

      node.on('close', () => {
        cluster.removeAllListeners();
        cluster.disableAllInterrupts();
      });
  }

  RED.nodes.registerType("pin-value", PinValueNode);
};
