module.exports = (RED) => {

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);

    this.addresses = JSON.parse(config.addresses).addresses;
    this.initialStates = JSON.parse(config.initialStates).initial_states;
    this.interrupts = JSON.parse(config.interrupts).interrupts;

    this.warn(this.interrupts)
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
