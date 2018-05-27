module.exports = (config) => {
  const PCF8574Cluster = require('pcf8574cluster');
  const i2cBus = require('i2c-bus').openSync(1);

  let cluster =
      new PCF8574Cluster(i2cBus, config.addresses, config.initial_states);

  if (config.interrupts && config.interrupts.length) {
    config.interrupts.forEach(interrupt => {
      console.log(interrupt)
      cluster.enableInterrupt(interrupt.index, interrupt.pin);
    });
  }

  return cluster;
};
