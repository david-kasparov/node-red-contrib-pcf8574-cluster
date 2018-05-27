module.exports = (RED) => {

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);

    this.warn(config)

    this.addresses = JSON.parse(config.addresses);
    this.initialStates = JSON.parse(config.initialStates);
    this.interrupts = JSON.parse(config.interrupts);
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
