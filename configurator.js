module.exports = (RED) => {

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);



    this.addresses = JSON.parse(config.addresses).addresses;

    this.addresses.forEach((address, i) => {
      this.addresses[i] = address.toString(16);
    });

    this.initialStates = JSON.parse(config.initialStates).initial_states;
    this.interrupts = JSON.parse(config.interrupts).interrupts;

    this.warn(this.addresses)
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
