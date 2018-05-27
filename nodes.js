const Cluster = require("./cluster");

const instances = {};

module.exports = (RED) => {

  function ClusterInNode(n) {
    RED.nodes.createNode(this, n);

    let node = this;
    let clusterConfig = RED.nodes.getNode(n.cluster);

    if (!instances[n.cluster]) {
      node.warn('in cluster instance created');
      instances[n.cluster] = Cluster(clusterConfig);
    }

    const cluster = instances[n.cluster];

    cluster.inputPin(n.pin, n.inverted)
    .then(() => {
      cluster.on('input', (msg) => {
        let _msg = {
          payload: msg
        };

        node.send(_msg);
      });

      node.on('close', () => {
        //cluster.removeAllListeners();
        //cluster.disableAllInterrupts();
      });
    });
  }

  RED.nodes.registerType("cluster-in", ClusterInNode);



  function ClusterOutNode(n) {
    RED.nodes.createNode(this, n);

    let node = this;
    let clusterConfig = RED.nodes.getNode(n.cluster);

    if (!instances[n.cluster]) {
      node.warn('out cluster instance created');
      instances[n.cluster] = Cluster(clusterConfig);
    }

    const cluster = instances[n.cluster];

    cluster.outputPin(n.pin, n.inverted, n.initialValue)
    .then(() => {
      node.on('input', (msg) => {
        cluster.setPin(n.pin, msg.payload.value)
        .then(() => {

        });
      });

      node.on('close', () => {
        //cluster.removeAllListeners();
        //cluster.disableAllInterrupts();
      });
    });
  }

  RED.nodes.registerType("cluster-out", ClusterOutNode);



  function PinValueNode(n) {
    RED.nodes.createNode(this, n);

    let node = this;
    let clusterConfig = RED.nodes.getNode(n.cluster);

    if (!instances[n.cluster]) {
      node.warn('pin cluster instance created');
      instances[n.cluster] = Cluster(clusterConfig);
    }

    const cluster = instances[n.cluster];

    node.on('input', (msg) => {
      let pinValue = cluster.getPinValue(n.pin);

      msg.payload.pin_value = pinValue;

      node.send(msg);
    });

    node.on('close', () => {
      //cluster.removeAllListeners();
      //cluster.disableAllInterrupts();
    });
  }

  RED.nodes.registerType("pin-value", PinValueNode);
};
