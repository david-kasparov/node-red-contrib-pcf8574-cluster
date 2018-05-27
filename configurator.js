module.exports = (RED) => {
  const PCF8574Cluster = require('pcf8574cluster');
  const i2cBus = require('i2c-bus').openSync(1);

  function ClusterConfiguratorNode(config) {
    RED.nodes.createNode(this, config);

    /*this.warn(config);

    this.addresses = JSON.parse(config.addresses);
    this.initialStates = JSON.parse(config.initialStates);

    if (config.interrupts) {
      this.interrupts = JSON.parse(config.interrupts);
    }

    this.warn(config.addresses);*/

    config.addresses = [0x20];
    config.initial_states = [true];

    let cluster =
      new PCF8574Cluster(i2cBus, config.addresses, config.initial_states);

    /*if (this.interrupts && this.interrupts.length) {
      this.interrupts.forEach(interrupt => {
        cluster.enableInterrupt(interrupt.index, interrupt.pin);
      });
    }*/

    this.cluster = cluster;
  }

  RED.nodes.registerType("cluster-configurator", ClusterConfiguratorNode);
}
