pragma solidity ^0.4.24;

import "installed_contracts/oraclize-api/contracts/usingOraclize.sol";
import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract PocDap is usingOraclize, Ownable {
    
    uint articleRegisryFee = 0.00001 ether;  
    string urlOraclize = "json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount";
    
    event CallbackReceived(string result);

    constructor(address oraclizeAddress) public {
        OAR = OraclizeAddrResolverI(oraclizeAddress);

        oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
    }

    function setArticleRegisryFee(uint _fee) external onlyOwner {
        articleRegisryFee = _fee;
    }

    function setUrlOraclize(string _url) external onlyOwner {
        urlOraclize = _url;
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
        require(estimatedTransactionPrice < msg.value, "Not enough gas to execute this method");
        oraclize_query("URL", urlOraclize);
    }


}