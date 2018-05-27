const Cluster = require("./cluster");

const instances = {};

module.exports = (RED) => {

  function ClusterOutNode(n) {
      RED.nodes.createNode(this, n);

      let node = this;
      let clusterConfig = RED.nodes.getNode(n.cluster);
this.warn(clusterConfig)
      if (!instances[n.cluster]) {
        instances[n.cluster] = Cluster(clusterConfig);
      }

      const cluster = instances[n.cluster];

      cluster.outputPin(n.pin, n.inverted, n.initialValue)
      .then(() => {
        this.on('input', (msg) => {
          cluster.setPin(msg.payload.pin, msg.payload.value)
          .then(() => {

          });
        });

        cluster.on('input', (msg) => {
          cluster.setPin(msg.payload.pin, msg.payload.value)
          .then(() => {

          });
        });
      });
  }

  RED.nodes.registerType("cluster-out", ClusterOutNode);
};
