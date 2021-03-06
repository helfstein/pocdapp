# PocDApp
## To run this project follow the steps below
First we'll need to instal dependencies for truffle template, angular and etherum-bridge

## 1 - Install dependencies for etherum-bridge
* $ cd etherumbridgenode
* $ npm install

## 2 - Install dependencies for truffle template 
* $ cd ..
* $ cd src
* $ npm install

## 3 - Install dependencies for angular project
* $ cd dapp
* $ npm install

## 4 - Edit truffle.js file located in src folder to point to etherum node like Ganache geth or truffle develop. The code sample is below.
```javascript
    module.exports = {
        networks: {
            ganache: {
                host: "127.0.0.1",//your etherum node ip address
                port: 7545,//port where rpc is running on your etherum node
                network_id: "*"       
            }
        }
    }
```
## 5 - Run your etherun node, in my case i'm using ganache, the link to download ganache for windows is below
[Downdload Ganache for Windows](https://truffleframework.com/ganache)

## 6 - Run your etherum bridge executing the below commands
* $ cd etherumbridgenode
* $ node bridge -a 2 -H 127.0.0.1 -p 7545

Note parameter -a indicates the account that gas will is used for deploy oraclize contract, -H indicates de etherum node ip and -p the port

### Note: If you are using Geth as your Ethereum Client, you must remember to initialize the private network with the following command:
	geth --identity nodeSOL --nodiscover --networkid 13 --port 60303 --maxpeers 10 --lightkdf --cache 16  --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain="*" --rpcapi="db,eth,net,web3,personal,web3" **--unlock 0** --datadir "C:\ETH\data-private" --minerthreads 1  --mine
Where the **--unlock** parameter is super important to make sure that your Oraclize contract on the Ethereum-bridge will deploy sucessfully into your private network. (the number informed after the unlock parameter is the index position from your accounts that you want to unlock from Geth).\
Note: --datadir "C:\ETH\data-private" its just a specified location where I create the node files in my local machine, feel free to create in another path.

## 7 - Set the address of oraclize resolver interface in your contract that uses the oraclize calls
* Edit PocDapp.sol file changing the value "0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475" by the OAR printed in console in previous step.

Note OAR address is printed like this: OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475)

## 8 - Compile and migrate your contract using below commands in "src/" folder with another prompt or powershell window
* $ truffle migrate --compile all --reset --network ganache

## 9 - Run your angular from folder "src/dapp/" using below commands with another prompt or powershell window
* $ ng serve -o
