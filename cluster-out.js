const Cluster = require("./cluster");

const instances = {};

module.exports = (RED) => {

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
      node.on('input', (msg) => {
        cluster.setPin(n.pin, msg.payload.value)
        .then(() => {

        });
      });

      node.on('close', () => {
        cluster.removeAllListeners();
        cluster.disableAllInterrupts();
      });
    });
  }

  RED.nodes.registerType("cluster-out", ClusterOutNode);
};
