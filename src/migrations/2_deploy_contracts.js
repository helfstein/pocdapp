var PocDap = artifacts.require("./PocDap.sol");

module.exports = function(deployer, network, accounts) {
    // Deploys the OraclizeTest contract and funds it with 0.5 ETH
    // The contract needs a balance > 0 to communicate with Oraclize
    deployer.deploy(
        PocDap,
      
      { from: accounts[2], gas: 6721975, value: 500000000000000000 });
      
  };