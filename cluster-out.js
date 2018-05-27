module.exports = (RED) => {

  function ClusterOutNode(n) {
      RED.nodes.createNode(this, n);

      //TODO:
      let clusterConfig = RED.nodes.getNode(n.cluster);
      clusterConfig = {
        addresses: [0x20],
        initial_states: [true]
      };

      const cluster = require("./cluster")(clusterConfig);

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
