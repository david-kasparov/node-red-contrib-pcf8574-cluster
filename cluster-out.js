const Cluster = require("./cluster");

const instances = {};

module.exports = (RED) => {

  function ClusterOutNode(n) {
      RED.nodes.createNode(this, n);

      //TODO:
      let clusterConfig = RED.nodes.getNode(n.cluster);
      clusterConfig = {
        addresses: [0x20, 0x26],
        initial_states: [true, true]
      };

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
