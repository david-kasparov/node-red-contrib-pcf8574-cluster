module.exports = (RED) => {
  function ClusterOutNode(config) {
      RED.nodes.createNode(this, config);

      let clusterConfig = RED.nodes.getNode(config.cluster);

      ///tmp
      clusterConfig = {
        addresses: [0x20],
        initial_states: [true]
      };

      const cluster = require("./cluster")(clusterConfig);

      cluster.outputPin(1, true, false)
      .then(() => {
        cluster.setPin(1, true);
      });

      this.on('input', (msg) => {
        this.send(msg);
      });
  }

  RED.nodes.registerType("cluster-out", ClusterOutNode);
};
