module.exports = (RED) => {

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);

    /*this.warn(config);

    this.addresses = JSON.parse(config.addresses);
    this.initialStates = JSON.parse(config.initialStates);

    if (config.interrupts) {
      this.interrupts = JSON.parse(config.interrupts);
    }

    this.warn(config.addresses);*/

    //config.addresses = [0x20];
    //config.initial_states = [true];
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
