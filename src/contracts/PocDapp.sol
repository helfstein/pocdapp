pragma solidity ^0.4.24;

import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";
import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract PocDapp is usingOraclize, Ownable {
    
    uint articleRegisryFee = 0.00001 ether;  
        
    event CallbackReceived(string result);
    event ValueSended(uint value);

    constructor(address _oarAddress) public payable {
        OAR = OraclizeAddrResolverI(_oarAddress);

        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
    }

    // Fallback function
    function() public{
        revert("reverted");
    }

    function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress(), "This address is not a valid coinbase");

        emit CallbackReceived(result);        
    }

    function refreshEthPrice() public payable {
        uint estimatedTransactionPrice = oraclize_getPrice("URL") + articleRegisryFee;
        emit ValueSended(msg.value);
        address(this).balance + msg.value;
        require(estimatedTransactionPrice < msg.value, "Not enough gas to execute this method");
        //address(this).balance + articleRegisryFee;
        oraclize_query("URL", "json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount");
    }
 
    function getOraclizeFee() public returns (uint _fee) {
        return oraclize_getPrice("URL");
    }

    function getFee() public returns (uint _fee) {
        return articleRegisryFee;
    }

    function getBalance() public returns (uint _balance) {
        return address(this).balance;
    }

}