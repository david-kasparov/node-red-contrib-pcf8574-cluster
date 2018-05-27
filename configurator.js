module.exports = (RED) => {
  const PCF8574Cluster = require('pcf8574cluster');
  const i2cBus = require('i2c-bus').openSync(1);

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);

    this.warn(config);

    this.addresses = config.addresses;
    this.initialStates = config.initialStates;
    this.interrupts = config.interrupts;

    const cluster =
      new PCF8574Cluster(i2cBus, config.addresses, config.initial_states);

    if (this.interrupts && this.interrupts.length) {
      this.interrupts.forEach(interrupt => {
        cluster.enableInterrupt(interrupt.index, interrupt.pin);
      });
    }

    this.cluster = cluster;
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
