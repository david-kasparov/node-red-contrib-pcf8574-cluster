module.exports = (RED) => {

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);



    this.warn(config.addresses);

    /*this.addresses = JSON.parse(config.addresses);
    this.initialStates = JSON.parse(config.initialStates);

    if (config.interrupts) {
      this.interrupts = JSON.parse(config.interrupts);
    }

    clusterConfig = {
        addresses: [0x20, 0x26],
        initial_states: [true, true]
      };

    this.warn(config.addresses);*/
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
